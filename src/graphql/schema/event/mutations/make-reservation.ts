import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { PrismaEventRepository } from '../../../../modules/event/repos/implementations/PrismaEventRepository'
import { PrismaTicketRepository } from '../../../../modules/ticket/repos/implementations/PrismaTicketRepository'
import { MakeReservationUseCase } from '../../../../modules/ticket/use-cases/make-reservation/MakeReservationUseCase'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../../ticket/types/ticket'

export const MakeReservationInput = inputObjectType({
  name: 'MakeReservationInput',
  definition (t) {
    t.nonNull.id('parentId')
    t.nonNull.field('date', {
      type: 'DateTime'
    })
  }
})

export const MakeReservationMutation = mutationField('MakeReservation', {
  description: 'Allows a CLIENT to reserve a spot on a slot',
  type: TicketNexus,
  args: {
    input: nonNull(arg({
      type: MakeReservationInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    if (!currentUser) throw new Error('Usuário precisa estar logado')
    const eventRepo = new PrismaEventRepository(prisma)
    const ticketRepo = new PrismaTicketRepository(prisma)
    const useCase = new MakeReservationUseCase(
      currentUser!,
      eventRepo,
      ticketRepo,
      prisma
    )
    return useCase.execute(input)
  }
})
