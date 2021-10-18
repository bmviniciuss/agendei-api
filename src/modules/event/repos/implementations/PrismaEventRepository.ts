import { PrismaClient } from '.prisma/client'

import {
  EventToOccurence,
  LoadEventsToOccurrencesRepository
} from '../EventRepository'

export class PrismaEventRepository implements
LoadEventsToOccurrencesRepository {
  constructor (private readonly prisma: PrismaClient) { }
  loadEventsToOccurrences (spaceIds: string[] | undefined | null): Promise<EventToOccurence[]> {
    const spaceFilter = (() => {
      if (!spaceIds || spaceIds === null) return undefined
      return { in: spaceIds as string[] }
    })()

    return this.prisma.event.findMany({
      where: {
        space: {
          id: spaceFilter
        },
        active: true
      },
      include: {
        eventDetails: true,
        eventsBooked: {
          include: {
            eventDetails: true
          }
        }
      }
    })
  }
}
