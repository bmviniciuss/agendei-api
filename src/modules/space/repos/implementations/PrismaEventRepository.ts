import { PrismaClient } from '@prisma/client'

import { TimeRange } from '../../../../types'
import { DomainEvent } from '../../domain/Event'
import { DomainEventWithEventsInstaces } from '../../domain/EventWithInstance'
import { DomainSpace } from '../../domain/Space'
import { CreateEventDTO } from '../../useCases/event/useCases/createEvent/CreateEventDTO'
import { IEventRepository, SpaceId } from '../IEventRepository'

export class PrismaEventRepository implements IEventRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  async create (data: CreateEventDTO): Promise<DomainEvent> {
    const { eventDetails, spaceId, rule } = data
    return this.prisma.event.create({
      data: {
        space: {
          connect: {
            id: spaceId
          }
        },
        rule,
        eventDetails: {
          create: {
            ...eventDetails
          }
        }
      },
      include: {
        eventDetails: true
      }
    })
  }

  listSpaceEvents (spaceId: string): Promise<DomainEvent[]> {
    return this.prisma.event.findMany({
      where: {
        space: {
          id: spaceId
        }
      },
      include: {
        eventDetails: true
      }
    })
  }

  listSpaceEventsWithInstances (spaceIds?: SpaceId[], dateRangeInput?: TimeRange): Promise<DomainEventWithEventsInstaces[]> {
    const spaceFilter = (() => {
      if (!spaceIds || spaceIds === null) return undefined
      return { id: { in: spaceIds as string[] } }
    })()

    return this.prisma.event.findMany({
      where: {
        active: true,
        space: spaceFilter || undefined
      },
      include: {
        eventDetails: true,
        eventsInstances: {
          where: dateRangeInput
            ? {
                date: {
                  gte: dateRangeInput.startTime,
                  lte: dateRangeInput.endTime
                }
              }
            : undefined,
          include: {
            eventDetails: true
          }
        }
      }
    })
  }

  findById (id: string): Promise<DomainEvent & { space: DomainSpace } | null> {
    return this.prisma.event.findUnique({
      where: {
        id
      },
      include: {
        eventDetails: true,
        space: {
          include: {
            ruleSet: true
          }
        }
      }
    })
  }
}
