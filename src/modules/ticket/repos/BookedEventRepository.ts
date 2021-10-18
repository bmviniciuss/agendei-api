import { EventBooked, EventDetails, Ticket, TicketStatus } from '@prisma/client'

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

export type FindBookedEventWithActiveTickets = (EventBooked & {
  eventDetails: EventDetails;
  tickets: Ticket[];
}) | null

export interface FindBookedEventWithActiveTicketsRepository {
  findBookedEventWithActiveTickets(id: EventBooked['id']): Promise<FindBookedEventWithActiveTickets>
}
