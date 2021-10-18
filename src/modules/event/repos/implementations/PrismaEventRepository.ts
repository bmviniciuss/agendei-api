import { PrismaClient } from '.prisma/client'

import {
  EventQuery,
  EventToOccurence,
  FindEventByParentId,
  LoadEventsToOccurrencesRepository
} from '../EventRepository'

export class PrismaEventRepository implements
LoadEventsToOccurrencesRepository,
FindEventByParentId {
  private eventQueryInclude;

  constructor (private readonly prisma: PrismaClient) {
    this.eventQueryInclude = {
      eventDetails: true,
      space: {
        include: {
          ruleSet: {
            select: {
              type: true,
              limit: true
            }
          }
        }
      }
    }
  }

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

  findEventByParent (parentId: string): Promise<EventQuery | null> {
    return this.prisma.event.findUnique({
      where: {
        id: parentId
      },
      include: this.eventQueryInclude
    })
  }
}
