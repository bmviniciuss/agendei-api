import { TicketStatus } from '.prisma/client'

import { objectType, enumType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventDetailsNexus } from '../../event'
import { UserNexus } from '../../user'

export const TicketStatusNexusEnum = enumType({
  name: 'TicketStatus',
  members: Object.values(TicketStatus)
})

export const EventBookedNexus = objectType({
  name: 'EventBooked',
  definition (t) {
    t.nonNull.id('id')
    t.field('eventDetails', {
      type: EventDetailsNexus
    })
    t.nonNull.field('date', { type: 'DateTime' })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})

export const TicketNexus = objectType({
  name: 'Ticket',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.field('status', { type: TicketStatusNexusEnum })
    t.nonNull.boolean('active')
    t.field('user', {
      type: UserNexus,
      resolve (root, _args, { prisma }: Context) {
        return prisma.ticket.findFirst({
          where: {
            id: root.id
          },
          select: {
            user: true
          }
        }).then(data => data!.user)
      }
    })
    t.field('bookedEvent', {
      type: EventBookedNexus
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
