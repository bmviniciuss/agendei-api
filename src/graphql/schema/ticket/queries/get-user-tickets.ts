import { list, nonNull, queryField } from 'nexus'

import { PrismaTicketRepository } from '../../../../modules/ticket/repos/implementations/PrismaTicketRepository'
import { GetUserTicketsUseCase } from '../../../../modules/ticket/use-cases/get-user-tickets/GetUserTicketsUseCase'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../types'

export const GetUserTicketsQuery = queryField('GetUserTickets', {
  description: "Get current user's tickets",
  type: list(nonNull(TicketNexus)),

  resolve (_root, _args, { prisma, currentUser }: Context) {
    const ticketRepo = new PrismaTicketRepository(prisma)
    const useCase = new GetUserTicketsUseCase(currentUser!, ticketRepo)
    return useCase.execute()
  }
})
