
import { queryField, nonNull, list, inputObjectType } from 'nexus'

import { PrismaEventRepository } from '../../../../modules/space/repos/implementations/PrismaEventRepository'
import { ListOccurrences } from '../../../../modules/space/useCases/occurrence/listOccurrences/ListOccurrences'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { OccurenceType } from '../types'

export const GetOccurrencesInput = inputObjectType({
  name: 'GetOccurrencesInput',
  definition (t) {
    t.field('spaceIds', {
      type: list(nonNull('String'))
    })
    t.nonNull.field('startTime', { type: 'DateTime' })
    t.nonNull.field('endTime', { type: 'DateTime' })
  }
})

export const GetOccurencesQuery = queryField('GetOccurences', {
  description: 'Get occurences',
  args: {
    input: nonNull(GetOccurrencesInput)
  },
  type: list(nonNull(OccurenceType)),
  async resolve (_, { input }, { prisma }: Context) {
    const eventRepository = new PrismaEventRepository(prisma)
    const useCase = new ListOccurrences(eventRepository)
    return useCase.execute({
      spaceIds: input.spaceIds || undefined,
      dateRange: {
        startTime: input.startTime,
        endTime: input.endTime
      }
    })
  }
})
