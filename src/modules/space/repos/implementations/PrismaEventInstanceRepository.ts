import { EventTypeEnum, PrismaClient } from '@prisma/client'
import { omit } from 'lodash'

import { EventInstanceWithSlotsAndTicketsStatus, FindOrCreateEventInstaceDTO, IEventInstaceRepository } from '../IEventInstanceRepository'

export class PrismaEventInstanceRepoitory implements IEventInstaceRepository {
  constructor (private readonly prisma: PrismaClient) {}

  findOrCreateEventInstace (data: FindOrCreateEventInstaceDTO): Promise<EventInstanceWithSlotsAndTicketsStatus> {
    const { parentId, date, eventDetails } = data
    return this.prisma.eventInstance.upsert({
      where: {
        parentId_date: {
          parentId,
          date
        }
      },
      update: {},
      create: {
        date,
        parent: {
          connect: {
            id: parentId
          }
        },
        eventDetails: {
          create: {
            ...omit(eventDetails, 'id', 'createdAt', 'updatedAt'),
            type: EventTypeEnum.BOOKED
          }
        }
      },
      include: {
        eventDetails: {
          select: {
            slots: true
          }
        },
        tickets: {
          select: {
            status: true
          }
        }
      }
    })
  }
}
