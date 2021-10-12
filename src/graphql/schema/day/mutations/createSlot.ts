
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { CreateSlotUseCaseFactory } from '../../../../modules/slot/use-cases/create-slot/CreateSlotUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { DateTime } from '../../../schema'
import { SlotNexus } from '../types'

export const CreateSlotInput = inputObjectType({
  name: 'CreateSlotInput',
  definition (t) {
    t.nonNull.id('dayId')
    t.nonNull.int('usersLimit')
    t.nonNull.field('startTime', { type: DateTime })
    t.nonNull.field('endTime', { type: DateTime })
  }
})

export const CreateSlotMutation = mutationField('createSlot', {
  description: 'Allows a ADMIN to create a slot on a day on the system. ',
  type: SlotNexus,
  args: {
    input: nonNull(arg({
      type: CreateSlotInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    const useCase = new CreateSlotUseCaseFactory(currentUser!, prisma).build()
    return useCase.execute(input)
  }
})
