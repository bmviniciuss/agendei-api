import { EventBooked, Space, Ticket, User } from '.prisma/client'

import { TimeRange } from '../../../types'

export type CountActiveUserTicketsFromSpaceInDateRangeRepositoryDTO = {
  userId: User['id']
  spaceId: Space['id']
  dateRange: TimeRange
}

export interface CountActiveUserTicketsFromSpaceInDateRangeRepository {
  countActiveUserTicketsFromSpaceInDateRange(data: CountActiveUserTicketsFromSpaceInDateRangeRepositoryDTO): Promise<number>
}

export type CreateTicketRepositoryDTO = {
  userId: User['id']
  bookedEventId: EventBooked['id']
}

export interface CreateTicketRepository {
  create(data: CreateTicketRepositoryDTO): Promise<Ticket>
}
