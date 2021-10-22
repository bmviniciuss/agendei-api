import { EventInstance, Space, Ticket, User } from '.prisma/client'

import { TEventWithDetails, TimeRange } from '../../../types'
import { DomainTicket } from '../domain/Ticket'

export type TicketWithEventInstance = Ticket & {
  eventInstance: TEventWithDetails<EventInstance>
}

export type CountUsersActiveTicketFromSpaceDTO = {
  userId: User['id']
  spaceId: Space['id']
  dateRange: TimeRange
}

export type CreateTicketRepositoryDTO = {
  userId: User['id']
  eventInstanceId: EventInstance['id']
}

export interface ITicketRepository {
  loadTicketsFromUser(userId: User['id']): Promise<DomainTicket[]>
  countUsersActiveTicketFromSpace(data: CountUsersActiveTicketFromSpaceDTO): Promise<number>
  create(data: CreateTicketRepositoryDTO): Promise<DomainTicket>
}
