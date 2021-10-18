
import { queryField, nonNull, list, inputObjectType } from 'nexus'

import { GetOccurrencesUseCaseFactory } from '../../../../modules/event/use-cases/get-occurrences/GetOccurrencesUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { OccurenceType } from '../types'

export const GetOccurrencesInput = inputObjectType({
  name: 'GetOccurrencesInput',
  definition (t) {
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
    const usecase = new GetOccurrencesUseCaseFactory(prisma).build()
    return usecase.execute({ dateRange: input })
  }
})
