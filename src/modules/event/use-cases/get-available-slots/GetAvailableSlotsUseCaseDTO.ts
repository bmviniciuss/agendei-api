import { EventBooked, EventTypeEnum } from '.prisma/client'

export type GetAvailableSlotsUseCaseRootField = {
  slots?: number | null | undefined
}

export type GetAvailableSlotsUseCaseDTO = {
  root: GetAvailableSlotsUseCaseRootField
  bookedEventId: EventBooked['id']
  eventType: EventTypeEnum
}
