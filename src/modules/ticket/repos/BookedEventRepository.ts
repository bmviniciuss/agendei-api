import { EventBooked, EventDetails, TicketStatus } from '@prisma/client'

type EventBookedDetailsSlot = {
  slots: number;
}

type EventBookedTicketsStatus = {
  status: TicketStatus;
}

export type EventBookedWithDetailsAndTickets = EventBooked & {
  eventDetails: EventBookedDetailsSlot;
  tickets: EventBookedTicketsStatus[];
}

export type FindOrCreateBookedEventDTO = {
  eventDetails: EventDetails
  parentId: string
  date: Date
}

export interface FindOrCreateBookedEvent {
  findOrCreateBookedEvent(data: FindOrCreateBookedEventDTO): Promise<EventBookedWithDetailsAndTickets>
}
