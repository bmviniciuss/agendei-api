import { EventTypeEnum, PrismaClient, TicketStatus } from '.prisma/client'

import omit from 'lodash/omit'

import { EventBookedWithDetailsAndTickets, FindBookedEventWithActiveTickets, FindBookedEventWithActiveTicketsRepository, FindOrCreateBookedEvent, FindOrCreateBookedEventDTO } from '../BookedEventRepository'

export class PrismaBookedEventRepository implements FindOrCreateBookedEvent, FindBookedEventWithActiveTicketsRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async findOrCreateBookedEvent (data: FindOrCreateBookedEventDTO): Promise<EventBookedWithDetailsAndTickets> {
    const { parentId, date, eventDetails } = data
    return this.prisma.eventBooked.upsert({
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
        tickets: {
          select: {
            status: true
          }
        },
        eventDetails: {
          select: {
            slots: true
          }
        }
      }
    })
  }

  async findBookedEventWithActiveTickets (id: string): Promise<FindBookedEventWithActiveTickets> {
    return this.prisma.eventBooked.findUnique({
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
