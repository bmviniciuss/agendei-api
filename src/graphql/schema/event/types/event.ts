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
      async resolve (root, _args, { prisma }: Context) {
        const event = await prisma.event.findUnique({
          where: {
            id: root.id
          },
          include: { eventDetails: true }
        })
        if (!event?.eventDetails) return null
        return event.eventDetails
      }
    })
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})

export const EventInstanceNexus = objectType({
  name: 'EventInstance',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.field('date', { type: 'DateTime' })
    t.field('parent', {
      type: EventNexus,
      async resolve (root, _args, { prisma }:Context) {
        const eventInstance = await prisma.eventInstance.findUnique({
          where: { id: root.id },
          include: { parent: true }
        })
        if (!eventInstance?.parent) return null
        return eventInstance.parent
      }
    })
    t.field('eventDetails', {
      type: EventDetailsNexus,
      async resolve (root, _args, { prisma } :Context) {
        const eventInstance = await prisma.eventInstance.findUnique({
          where: { id: root.id },
          include: { eventDetails: true }
        })
        if (eventInstance?.eventDetails) return eventInstance.eventDetails
        return null
      }
    })
    t.boolean('isCanceled')
    t.boolean('isRescheduled')
    t.boolean('active')
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  }
})
