
import { EventTypeEnum } from '.prisma/client'

import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventNexus } from '../types/event'

export const CreateEventEventDetailsInput = inputObjectType({
  name: 'CreateEvent_EventDetailsInput',
  definition (t) {
    t.nonNull.string('title')
    t.nonNull.string('description')
    t.nonNull.float('duration')
    t.nonNull.int('slots')
  }
})

export const CreateEventInput = inputObjectType({
  name: 'CreateEventInput',
  definition (t) {
    t.nonNull.id('spaceId')
    t.nonNull.string('rule')
    t.nonNull.field('eventDetails', {
      type: CreateEventEventDetailsInput
    })
  }
})

export const CreateEventMutation = mutationField('CreateEvent', {
  description: 'Allows a ADMIN to create a event for a space',
  type: EventNexus,
  args: {
    input: nonNull(arg({
      type: CreateEventInput
    }))
  },

  async resolve (_, { input }, { prisma }: Context) {
    const { eventDetails, rule, spaceId } = input
    const { description, duration, slots, title } = eventDetails
    return prisma.event.create({
      data: {
        rule,
        space: {
          connect: {
            id: spaceId
          }
        },
        eventDetails: {
          create: {
            description,
            duration,
            slots,
            title,
            type: EventTypeEnum.EVENT
          }
        }
      }
    })
  }
})
