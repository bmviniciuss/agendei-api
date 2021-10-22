import { PrismaClient, RuleSetTypeEnum, Ticket, TicketStatus, User } from '.prisma/client'

import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import startOfISOWeek from 'date-fns/startOfISOWeek'
import endOfISOWeek from 'date-fns/endOfISOWeek'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import isBefore from 'date-fns/isBefore'

import { UseCase } from '../../../../../shared/core/UseCase'
import { MakeReservationDTO } from './MakeReservationDTO'
import { MakeReservationErrors } from './MakeReservationErrors'
import { PrismaTicketRepository } from '../../../../ticket/repos/implementations/PrismaTicketRepository'
import { IEventRepository } from '../../../repos/IEventRepository'
import { DomainEvent } from '../../../domain/Event'
import { DomainSpace } from '../../../domain/Space'
import { ITicketRepository } from '../../../../ticket/repos/TicketRepository'
import { PrismaEventInstanceRepoitory } from '../../../repos/implementations/PrismaEventInstanceRepository'

export type MakeReservationUseCaseResult = Ticket | null

type DomainEventWithSpace = DomainEvent & { space: DomainSpace }

export class MakeReservationUseCase implements UseCase<MakeReservationDTO, MakeReservationUseCaseResult> {
  constructor (
    private readonly currentUser: User,
    private readonly prisma: PrismaClient,
    private readonly eventRepository: IEventRepository,
    private readonly ticketRepository: ITicketRepository
  ) { }

  async execute (data: MakeReservationDTO): Promise<MakeReservationUseCaseResult> {
    if (isBefore(data.date, new Date())) {
      throw new MakeReservationErrors.PastDateReservationError()
    }

    const parentEvent: DomainEventWithSpace | null = await this.eventRepository.findById(data.parentId)
    if (!parentEvent) throw new MakeReservationErrors.NoParentEventFound()
    await this._validateParentEventRuleSet(data.date, parentEvent)
    /**
     * dont know how to use transaction inside repository with dependency injection
     */
    // @ts-ignore
    const ticket = await this.prisma.$transaction(async (prismaT: PrismaClient) => {
      const transationEventInstanceRepository = new PrismaEventInstanceRepoitory(prismaT)
      const transactionalPrismaTicketRepository = new PrismaTicketRepository(prismaT)

      const eventInstance = await transationEventInstanceRepository.findOrCreateEventInstace({
        parentId: parentEvent.id,
        eventDetails: parentEvent.eventDetails,
        date: data.date
      })

      const eventIntanceTicketsCount = eventInstance.tickets.filter(({ status }) => {
        return status !== TicketStatus.CANCELED
      }).length

      if (eventIntanceTicketsCount + 1 > eventInstance.eventDetails.slots) {
        throw new MakeReservationErrors.EventIsFullError()
      }

      return transactionalPrismaTicketRepository.create({
        userId: this.currentUser.id,
        eventInstanceId: eventInstance.id
      })
    }) as Ticket
    return ticket
  }

  private async _validateParentEventRuleSet (date: Date, event: DomainEventWithSpace) {
    const { ruleSet, id: spaceId } = event.space
    if (ruleSet) {
      const dateToValidate = date
      const verificationRangeSlot = this._getRuleSetDateRangeValidation(ruleSet.type, dateToValidate)
      const usersTicketFromRangeCount = await this.ticketRepository.countUsersActiveTicketFromSpace({
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
