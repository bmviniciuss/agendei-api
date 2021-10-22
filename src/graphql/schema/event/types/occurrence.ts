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
    t.int('availableSlots', {
      async resolve (root, _args, { prisma }: Context) {
        if (root.isParentEvent) {
          return root.slots || 0
        } else {
          if (root.isCanceled) return 0
          const eventInstance = await prisma.eventInstance.findUnique({
            where: {
              id: root.id
            },
            include: {
              eventDetails: {
                select: {
                  slots: true
                }
              },
              tickets: {
                where: {
                  status: {
                    notIn: [TicketStatus.CANCELED]
                  }
                }
              }
            }
          })
          if (!!eventInstance?.tickets.length && eventInstance?.eventDetails?.slots) {
            const { tickets, eventDetails } = eventInstance
            return eventDetails.slots - tickets.length
          }
          return 0
        }
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
