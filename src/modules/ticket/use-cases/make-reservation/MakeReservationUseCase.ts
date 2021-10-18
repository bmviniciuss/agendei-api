import { PrismaClient, RuleSetTypeEnum, Ticket, TicketStatus, User } from '.prisma/client'

import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import startOfISOWeek from 'date-fns/startOfISOWeek'
import endOfISOWeek from 'date-fns/endOfISOWeek'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

import { UseCase } from '../../../../shared/core/UseCase'
import { EventQuery, FindEventByParentId } from '../../../event/repos/EventRepository'
import { MakeReservationDTO } from './MakeReservationDTO'
import { MakeReservationErrors } from './MakeReservationErrors'
import { CountActiveUserTicketsFromSpaceInDateRangeRepository } from '../../repos/TicketRepository'
import { PrismaBookedEventRepository } from '../../repos/implementations/PrismaBookedEventRepository'
import { PrismaTicketRepository } from '../../repos/implementations/PrismaTicketRepository'

export type MakeReservationUseCaseResult = Ticket | null

export class MakeReservationUseCase implements UseCase<MakeReservationDTO, MakeReservationUseCaseResult> {
  constructor (
    private readonly currentUser: User,
    private readonly findEventByParentRepository: FindEventByParentId,
    private readonly countCurrentUseActiveTickets: CountActiveUserTicketsFromSpaceInDateRangeRepository,
    private readonly prisma: PrismaClient
  ) { }

  async execute (data: MakeReservationDTO): Promise<MakeReservationUseCaseResult> {
    const parentEvent = await this.findEventByParentRepository.findEventByParent(data.parentId)
    if (!parentEvent) throw new MakeReservationErrors.NoParentEventFound()
    await this._validateParentEventRuleSet(data.date, parentEvent)
    /**
     * dont know how to use transaction inside repository with Dependecy injection
     */
    // @ts-ignore
    const ticket = await this.prisma.$transaction(async (prismaT: PrismaClient) => {
      const findOrCreateRepo = new PrismaBookedEventRepository(prismaT)
      const createTicketRepo = new PrismaTicketRepository(prismaT)

      const bookedEvent = await findOrCreateRepo.findOrCreateBookedEvent({
        parentId: parentEvent.id,
        eventDetails: parentEvent.eventDetails,
        date: data.date
      })
      const bookedEventsTicketsCount = bookedEvent.tickets.filter(({ status }) => {
        return status !== TicketStatus.CANCELED
      }).length

      if (bookedEventsTicketsCount + 1 > bookedEvent.eventDetails.slots) {
        throw new MakeReservationErrors.EventIsFullError()
      }

      return createTicketRepo.create({
        userId: this.currentUser.id,
        bookedEventId: bookedEvent.id
      })
    }) as Ticket
    return ticket
  }

  private async _validateParentEventRuleSet (date: Date, event: EventQuery) {
    const { ruleSet, id: spaceId } = event.space
    if (ruleSet) {
      const dateToValidate = date
      const verificationRangeSlot = this._getRuleSetDateRangeValidation(ruleSet.type, dateToValidate)
      const usersTicketFromRangeCount = await this.countCurrentUseActiveTickets.countActiveUserTicketsFromSpaceInDateRange({
        userId: this.currentUser.id,
        spaceId,
        dateRange: {
          startTime: verificationRangeSlot[0],
          endTime: verificationRangeSlot[1]
        }
      })
      if (usersTicketFromRangeCount + 1 > ruleSet.limit) {
        throw new MakeReservationErrors.UserSpaceTicketsLimitError()
      }
    }
  }

  private _getRuleSetDateRangeValidation (type: RuleSetTypeEnum, dateToValidate: Date): [Date, Date] {
    switch (type) {
      case RuleSetTypeEnum.DAILY:
        return [startOfDay(dateToValidate), endOfDay(dateToValidate)]
      case RuleSetTypeEnum.WEEKLY:
        return [startOfISOWeek(dateToValidate), endOfISOWeek(dateToValidate)]
      case RuleSetTypeEnum.MONTHLY:
        return [startOfMonth(dateToValidate), endOfMonth(dateToValidate)]
    }
  }
}