import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { PrismaEventRepository } from '../../../../modules/space/repos/implementations/PrismaEventRepository'
import { CreateEvent } from '../../../../modules/space/useCases/event/useCases/createEvent/CreateEvent'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventNexus } from '../types'

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
    const eventRepository = new PrismaEventRepository(prisma)
    const useCase = new CreateEvent(eventRepository)
    return useCase.execute(input)
  }
})
