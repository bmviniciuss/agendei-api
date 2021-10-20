import { PrismaClient, Ticket, TicketStatus } from '.prisma/client'

import {
  CountActiveUserTicketsFromSpaceInDateRangeRepository,
  CountActiveUserTicketsFromSpaceInDateRangeRepositoryDTO,
  CreateTicketRepository,
  CreateTicketRepositoryDTO,
  LoadUserTicketsRepository,
  TicketWithEventBooked
} from '../TicketRepository'

export class PrismaTicketRepository implements
CountActiveUserTicketsFromSpaceInDateRangeRepository,
CreateTicketRepository,
LoadUserTicketsRepository {
  private readonly ticketStatusFilter: TicketStatus[]
  private readonly ticketIncludeClause;

  constructor (private readonly prisma: PrismaClient) {
    this.ticketStatusFilter = [TicketStatus.RESERVED, TicketStatus.USED]
    this.ticketIncludeClause = {
      bookedEvent: {
        include: {
          eventDetails: true
        }
      }
    }
  }

  async countActiveUserTicketsFromSpaceInDateRange (data: CountActiveUserTicketsFromSpaceInDateRangeRepositoryDTO): Promise<number> {
    const { dateRange, spaceId, userId } = data
    return this.prisma.ticket.count({
      where: {
        user: {
          id: userId
        },
        status: {
          in: this.ticketStatusFilter
        },
        bookedEvent: {
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

  async create (data: CreateTicketRepositoryDTO): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        user: {
          connect: {
            id: data.userId
          }
        },
        bookedEvent: {
          connect: {
            id: data.bookedEventId
          }
        }
      }
    })
  }

  async loadUsersTickets (userId: string): Promise<TicketWithEventBooked[]> {
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
