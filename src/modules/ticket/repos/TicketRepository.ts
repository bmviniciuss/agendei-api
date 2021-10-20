import { EventInstance, Space, Ticket, User } from '.prisma/client'

import { TEventWithDetails, TimeRange } from '../../../types'
import { DomainTicket } from '../domain/Ticket'

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
  eventInstanceId: EventInstance['id']
}

export interface CreateTicketRepository {
  create(data: CreateTicketRepositoryDTO): Promise<Ticket>
}

export type TicketWithEventInstance = Ticket & {
  eventInstance: TEventWithDetails<EventInstance>
}

export interface ITicketRepository {
  loadTicketsFromUser(userId: User['id']): Promise<DomainTicket[]>
}
