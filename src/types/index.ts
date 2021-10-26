import { Event, EventDetails, EventInstance } from '@prisma/client'

export type TEventWithDetails<T = Event> = T & {
  eventDetails: EventDetails;
}

export type EventWithDetails = TEventWithDetails<Event>

export type EventInstanceWithEventDetails = TEventWithDetails<EventInstance>

export type TimeRange = {
  startTime: Date
  endTime: Date
}
