import { Space } from '.prisma/client'

type EventDetailsDTO = {
  title: string,
  description: string,
  duration: number,
  slots: number
}

export type CreateEventDTO = {
  spaceId: Space['id'],
  rule: string,
  eventDetails: EventDetailsDTO
}
