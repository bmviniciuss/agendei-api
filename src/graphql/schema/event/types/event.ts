import { EventTypeEnum } from '@prisma/client'
import { enumType, objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const EventTypeEnumNexus = enumType({
  name: 'EventTypeEnum',
  members: Object.values(EventTypeEnum)
})

export const EventDetailsNexus = objectType({
  name: 'EventDetails',
  definition (t) {
    t.nonNull.id('id')
    t.string('title')
    t.string('description')
    t.float('duration')
    t.int('slots')
    t.nonNull.field('type', { type: EventTypeEnumNexus })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})

export const EventNexus = objectType({
  name: 'Event',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('rule')
    t.field('eventDetails', {
      type: EventDetailsNexus,
      resolve (root, _args, { prisma }: Context) {
        return prisma.eventDetails.findFirst({
          where: {
            event: {
              id: root.id
            }
          }
        })
      }
    })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
