import { EventTypeEnum, PrismaClient, TicketStatus } from '.prisma/client'

import omit from 'lodash/omit'

import {
  EventInstanceWithSlotsAndTicketsStatus,
  EventInstanceWithDetailsAndTickets,
  FindBookedEventWithActiveTicketsRepository,
  FindOrCreateBookedEvent,
  FindOrCreateBookedEventDTO
} from '../EventInstanceRepository'

export class PrismaEventInstanceRepository implements FindOrCreateBookedEvent, FindBookedEventWithActiveTicketsRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async findOrCreateBookedEvent (data: FindOrCreateBookedEventDTO): Promise<EventInstanceWithSlotsAndTicketsStatus> {
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

  async findBookedEventWithActiveTickets (id: string): Promise<EventInstanceWithDetailsAndTickets> {
    return this.prisma.eventInstance.findUnique({
      where: {
        id
      },
      include: {
        eventDetails: true,
        tickets: {
          where: {
            status: {
              notIn: [TicketStatus.CANCELED]
            }
          }
        }
      }
    })
  }
}
