
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { CreateDayUseCaseFactory } from '../../../../modules/day/use-cases/create-day/CreateDayUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { DateTime } from '../../../schema'
import { DayNexus } from '../types'

export const CreateDayInput = inputObjectType({
  name: 'CreateDayInput',
  definition (t) {
    t.nonNull.field('date', { type: DateTime })
  }
})

export const CreateDayMutation = mutationField('createDay', {
  description: 'Allows a ADMIN to create a day on the system. ',
  type: DayNexus,
  args: {
    input: nonNull(arg({
      type: CreateDayInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    return new CreateDayUseCaseFactory(currentUser!, prisma).build().execute(input)
  }
})
