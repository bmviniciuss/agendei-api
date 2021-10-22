import { Event as PrismaEvent, EventDetails, EventInstance } from '.prisma/client'

export type DomainEventWithEventsInstaces = PrismaEvent & {
    eventDetails: EventDetails
    eventsInstances: (EventInstance & {
        eventDetails: EventDetails
    })[]
}
