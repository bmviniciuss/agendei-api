
import { queryField, nonNull, list, inputObjectType } from 'nexus'

import { PrismaEventRepository } from '../../../../modules/space/repos/implementations/PrismaEventRepository'
import { ListSpaceEvents } from '../../../../modules/space/useCases/event/useCases/listSpaceEvents/ListSpaceEvents'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { EventNexus } from '../types'

export const GetSpaceEventsInput = inputObjectType({
  name: 'GetSpaceEventsInput',
  definition (t) {
    t.nonNull.id('spaceId')
  }
})

export const GetSpaceEventsQuery = queryField('GetSpaceEvents', {
  description: "Get space's events ",
  args: {
    input: nonNull(GetSpaceEventsInput)
  },
  type: list(nonNull(EventNexus)),
  async resolve (_, { input }, { prisma }: Context) {
    const eventsRepository = new PrismaEventRepository(prisma)
    const usecase = new ListSpaceEvents(eventsRepository)
    return usecase.execute({
      spaceId: input.spaceId
    })
  }
})
