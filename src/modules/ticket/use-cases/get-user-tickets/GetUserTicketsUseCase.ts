import { User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { ITicketRepository } from '../../repos/TicketRepository'
import { DomainTicket } from '../../domain/Ticket'

type GetUserTicketsUseCaseResult = DomainTicket[]

export class GetUserTicketsUseCase implements UseCase<any, GetUserTicketsUseCaseResult > {
  constructor (
    private readonly currentUser: User,
    private readonly ticketRepository: ITicketRepository) {}

  async execute (): Promise<GetUserTicketsUseCaseResult> {
    return this.ticketRepository.loadTicketsFromUser(this.currentUser.id)
  }
}
