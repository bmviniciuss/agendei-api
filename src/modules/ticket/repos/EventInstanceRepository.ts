import { EventBooked, EventDetails, EventInstance, Ticket, TicketStatus } from '@prisma/client'

import { TEventWithDetails } from '../../../types'

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

export type EventInstanceWithSlotsAndTicketsStatus = EventInstance & {
  eventDetails: {
    slots: EventDetails['slots']
  }
  tickets: {
    status: Ticket['status']
  }[];
}

export type FindOrCreateBookedEventDTO = {
  eventDetails: EventDetails
  parentId: string
  date: Date
}

export interface FindOrCreateBookedEvent {
  findOrCreateBookedEvent(data: FindOrCreateBookedEventDTO): Promise<EventBookedWithDetailsAndTickets>
}

export type EventInstanceWithDetailsAndTickets = (TEventWithDetails<EventInstance> & {
  eventDetails: EventDetails;
  tickets: Ticket[];
}) | null

export interface FindBookedEventWithActiveTicketsRepository {
  findBookedEventWithActiveTickets(id: EventBooked['id']): Promise<EventInstanceWithDetailsAndTickets>
}
