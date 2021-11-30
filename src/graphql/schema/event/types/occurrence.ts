import { TicketStatus } from '.prisma/client'

import { objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventTypeEnumNexus } from './event'

export const OccurenceType = objectType({
  name: 'Occurrence',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.id('parentId')
    t.string('title')
    t.string('description')
    t.float('duration')
    t.nonNull.int('slots')
    t.nonNull.int('availableSlots', {
      async resolve (root, _args, { prisma }: Context) {
        if (root.isCanceled) return 0

        if (root.isParentEvent) {
          return root.slots || 0
        }

        const ticketsCount = await prisma.ticket.count({
          where: {
            eventInstance: {
              id: root.id
            },
            status: {
              notIn: [TicketStatus.CANCELED]
            }
          }
        })

        return root.slots - ticketsCount
      }
    })
    t.boolean('isFull', {
      async resolve (root, _args, { prisma }:Context) {
        if (root.isParentEvent) return false
        if (root.isCanceled) return false
        const tickets = await prisma.ticket.count({
          where: {
            eventInstance: {
              id: root.id
            },
            status: {
              notIn: [TicketStatus.CANCELED]
            }
          }
        })
        return tickets === root.slots
      }
    })
    t.boolean('userHasActiveReservedTicket', {
      async resolve (root, _args, { prisma, currentUser }:Context) {
        if (root.isParentEvent) return false
        if (root.isCanceled) return false
        if (root.isRescheduled) return false

        const ticket = await prisma.ticket.findFirst({
          where: {
            user: {
              id: currentUser!.id
            },
            eventInstance: {
              date: {
                equals: root.date
              }
            },
            active: true,
            status: TicketStatus.RESERVED
          }
        })
        if (!ticket) return false
        return true
      }
    })
    t.nonNull.list.field('userReservedTickets', {
      type: 'Ticket',
      async resolve (root, _args, { currentUser, prisma }: Context) {
        if (root.isParentEvent) return []
        if (root.isCanceled) return []
        if (root.isRescheduled) return []

        return await prisma.ticket.findMany({
          where: {
            status: {
              equals: 'RESERVED'
            },
            eventInstance: {
              id: root.id
            },
            user: {
              id: currentUser?.id
            }
          }
        })
      }
    })
    t.nonNull.boolean('isParentEvent')
    t.nonNull.boolean('isCanceled')
    t.nonNull.boolean('isRescheduled')
    t.nonNull.field('type', { type: EventTypeEnumNexus })
    t.nonNull.field('date', { type: 'DateTime' })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
