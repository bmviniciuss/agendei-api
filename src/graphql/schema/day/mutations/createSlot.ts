
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { DateTime } from '../../../schema'
import { SlotNexus } from '../types'

export const CreateSlotInput = inputObjectType({
  name: 'CreateSlotInput',
  definition (t) {
    t.nonNull.id('dayId')
    t.nonNull.int('usersLimit')
    t.nonNull.field('startDate', { type: DateTime })
    t.nonNull.field('endDate', { type: DateTime })
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
    const { dayId, startDate, endDate, usersLimit } = input
    return prisma.slot.create({
      data: {
        usersLimit,
        start: new Date(startDate),
        end: new Date(endDate),
        day: {
          connect: {
            id: dayId
          }
        }
      }
    })
  }
})
