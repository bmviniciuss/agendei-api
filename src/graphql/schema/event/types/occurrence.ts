import { EventTypeEnum, TicketStatus } from '@prisma/client'
import { objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventTypeEnumNexus } from './event'

export const OccurenceType = objectType({
  name: 'Occurence',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.id('parentId')
    t.string('title')
    t.string('description')
    t.float('duration')
    t.int('slots')
    t.int('availableSlots', {
      async resolve (root, _args, { prisma }: Context) {
        if (root.type === EventTypeEnum.OCCURRENCE) return root.slots || null
        if (root.type === EventTypeEnum.BOOKED) {
          const bookedEvent = await prisma.eventBooked.findUnique({
            where: {
              id: root.id
            },
            include: {
              eventDetails: true,
              tickets: {
                where: {
                  status: {
                    notIn: [TicketStatus.CANCELED]
                  }
                }
              }
            }
          })
          if (!bookedEvent) return null
          return bookedEvent.eventDetails.slots - bookedEvent.tickets.length
        }
        return null
      }
    })
    t.nonNull.field('type', { type: EventTypeEnumNexus })
    t.nonNull.field('date', { type: 'DateTime' })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
