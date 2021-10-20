import { Event as PrismaEvent, EventDetails } from '.prisma/client'

export type DomainEvent = PrismaEvent & {
    eventDetails: EventDetails
}
