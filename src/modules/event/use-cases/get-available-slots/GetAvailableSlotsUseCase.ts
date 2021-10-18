import { EventTypeEnum } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { FindBookedEventWithActiveTicketsRepository } from '../../../ticket/repos/BookedEventRepository'
import { GetAvailableSlotsUseCaseDTO } from './GetAvailableSlotsUseCaseDTO'

export type GetAvailableSlotsUseCaseResult = number | null

export class GetAvailableSlotsUseCase implements UseCase<GetAvailableSlotsUseCaseDTO, GetAvailableSlotsUseCaseResult> {
  constructor (
    private readonly findBookedEventWithActiveTicketsRepo: FindBookedEventWithActiveTicketsRepository
  ) { }

  async execute ({ bookedEventId, eventType, root }: GetAvailableSlotsUseCaseDTO): Promise<GetAvailableSlotsUseCaseResult> {
    if (eventType === EventTypeEnum.OCCURRENCE) return root.slots || null
    else if (eventType === EventTypeEnum.BOOKED) {
      const bookedEvent = await this.findBookedEventWithActiveTicketsRepo.findBookedEventWithActiveTickets(bookedEventId)
      if (!bookedEvent) return null
      return bookedEvent.eventDetails.slots - bookedEvent.tickets.length
    }
    return null
  }
}
