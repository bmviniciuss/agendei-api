import { PrismaClient } from '@prisma/client'

import { DomainEvent } from '../../domain/Event'
import { CreateEventDTO } from '../../useCases/event/useCases/createEvent/CreateEventDTO'
import { IEventRepository } from '../IEventRepository'

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
}
