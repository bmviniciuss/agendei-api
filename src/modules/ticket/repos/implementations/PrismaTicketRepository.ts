import { PrismaClient, TicketStatus } from '.prisma/client'

import {
  CountUsersActiveTicketFromSpaceDTO,
  CreateTicketRepositoryDTO,
  ITicketRepository
} from '../TicketRepository'
import { DomainTicket } from '../../domain/Ticket'

export class PrismaTicketRepository implements ITicketRepository {
  private readonly ticketStatusFilter: TicketStatus[]
  private readonly ticketIncludeClause;

  constructor (private readonly prisma: PrismaClient) {
    this.ticketStatusFilter = [TicketStatus.RESERVED, TicketStatus.USED]
    this.ticketIncludeClause = {
      eventInstance: {
        include: {
          eventDetails: true
        }
      }
    }
  }

  countUsersActiveTicketFromSpace (data: CountUsersActiveTicketFromSpaceDTO): Promise<number> {
    const { dateRange, spaceId, userId } = data
    return this.prisma.ticket.count({
      where: {
        user: {
          id: userId
        },
        status: {
          in: [TicketStatus.RESERVED, TicketStatus.USED]
        },
        eventInstance: {
          parent: {
            space: {
              id: spaceId
            }
          },
          date: {
            gte: dateRange.startTime,
            lte: dateRange.endTime
          }
        }
      }
    })
  }

  async create (data: CreateTicketRepositoryDTO): Promise<DomainTicket> {
    return this.prisma.ticket.create({
      data: {
        user: {
          connect: {
            id: data.userId
          }
        },
        eventInstance: {
          connect: {
            id: data.eventInstanceId
          }
        }
      },
      include: {
        eventInstance: {
          include: {
            eventDetails: true
          }
        }
      }
    })
  }

  async loadTicketsFromUser (userId: string): Promise<DomainTicket[]> {
    return this.prisma.ticket.findMany({
      where: {
        user: {
          id: userId
        }
      },
      include: this.ticketIncludeClause,
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
