import { EventDetails, EventInstance, Ticket } from '.prisma/client'

export type FindOrCreateEventInstaceDTO = {
  eventDetails: EventDetails
  parentId: string
  date: Date
}

export type EventInstanceWithSlotsAndTicketsStatus = EventInstance & {
  eventDetails: {
    slots: EventDetails['slots']
  }
  tickets: {
    status: Ticket['status']
  }[];
}

export interface IEventInstaceRepository {
  findOrCreateEventInstace(data: FindOrCreateEventInstaceDTO): Promise<EventInstanceWithSlotsAndTicketsStatus>
}
