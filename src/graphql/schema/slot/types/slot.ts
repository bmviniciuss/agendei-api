import { list, objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { TicketNexus } from '../../ticket/types/ticket'

export const SlotNexus = objectType({
  name: 'Slot',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.int('usersLimit')
    t.nonNull.field('startTime', { type: 'DateTime' })
    t.nonNull.field('endTime', { type: 'DateTime' })
    t.nonNull.field('activeTicketsCount', {
      type: 'Int',
      resolve (root, _args, { prisma }:Context) {
        return prisma.ticket.count({
          where: {
            active: true,
            slotId: root.id,
            status: {
              in: ['RESERVED', 'USED']
            }
          }
        })
      }
    })
    t.nonNull.field('tickets', {
      type: list(TicketNexus),
      resolve (root, _args, { prisma }:Context) {
        return prisma.ticket.findMany({
          where: {
            active: true,
            slotId: root.id
          }
        })
      }
    })
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
