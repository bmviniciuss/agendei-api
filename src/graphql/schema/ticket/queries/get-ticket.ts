import { UserType } from '@prisma/client'
import { idArg, nonNull, queryField } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../types'

export const GetTicketById = queryField('GetTicketById', {
  description: 'Get a ticket by id',
  type: TicketNexus,
  args: {
    ticketId: nonNull(idArg())
  },
  async resolve (_root, args, { prisma, currentUser }: Context) {
    if (!currentUser) return null

    const ticket = await prisma.ticket.findUnique({ where: { id: args.ticketId }, include: { user: true } })
    if (!ticket) throw new Error('Favor fornecer um id válido de ticket.')

    const { user, ...ticketData } = ticket
    if (currentUser.type === UserType.ADMIN) return ticketData
    if (user.id !== currentUser.id) throw new Error('Você não tem permissão para visualizar esse ticket.')

    return ticketData
  }
})
