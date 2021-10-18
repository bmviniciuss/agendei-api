import { Event, EventBooked, EventDetails, EventTypeEnum } from '@prisma/client'

export interface Occurrence {
  id: string
  parentId: string
  title: string
  description: string
  duration: number
  slots: number
  type: EventTypeEnum
  active: boolean
  date: string
  createdAt: Date;
  updatedAt: Date;
}

export type TEventWithDetails<T = Event> = T & {
  eventDetails: EventDetails;
}

export type EventWithDetails = TEventWithDetails<Event>

export type EventBookedWithDetails = TEventWithDetails<EventBooked>

export type EventWithDetailsAndBookedEvents = EventWithDetails & {
  eventsBooked: EventBookedWithDetails[]
}

export type TimeRange = {
  startTime: Date
  endTime: Date
}
