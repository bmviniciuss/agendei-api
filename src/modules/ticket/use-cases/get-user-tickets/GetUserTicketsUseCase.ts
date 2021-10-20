import { User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { LoadUserTicketsRepository, TicketWithEventBooked } from '../../repos/TicketRepository'

type GetUserTicketsUseCaseResult = TicketWithEventBooked[]

export class GetUserTicketsUseCase implements UseCase<any, GetUserTicketsUseCaseResult > {
  constructor (
    private readonly currentUser: User,
    private readonly loadUserTicketsRepository: LoadUserTicketsRepository) {}

  async execute (): Promise<GetUserTicketsUseCaseResult> {
    const userTickets = await this.loadUserTicketsRepository.loadUsersTickets(this.currentUser.id)
    return userTickets
  }
}
