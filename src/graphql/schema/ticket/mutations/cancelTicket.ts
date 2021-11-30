import { TicketStatus, UserType } from '.prisma/client'

import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../../ticket/types/ticket'

export const CancelTicketInput = inputObjectType({
  name: 'CancelTicketInput',
  definition (t) {
    t.nonNull.id('ticketId')
  }
})

export const CancelTicketMutation = mutationField('CancelTicket', {
  description: 'Allows a CLIENT cancel a RESERVED Ticket',
  type: TicketNexus,
  args: {
    input: nonNull(arg({
      type: CancelTicketInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    if (!currentUser) throw new Error('Usuário precisa estar logado')
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: input.ticketId
      },
      include: {
        user: true
      }
    })

    if (!ticket) throw new Error('Fornecer um ticket válido')
    if (ticket.status !== TicketStatus.RESERVED) throw new Error('Status de ticket inválido.')

    if (currentUser.type === UserType.CLIENT) {
      if (ticket.user.id !== currentUser.id) throw new Error('Você não tem autorização para realizar esse cancelamento.')
    }

    return prisma.ticket.update({
      where: {
        id: ticket.id
      },
      data: {
        status: TicketStatus.CANCELED
      }
    })
  }
})
