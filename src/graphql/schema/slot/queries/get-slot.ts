import { queryField, nonNull, idArg } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { SlotNexus } from '../types'

export const GetSlotQuery = queryField('GetSlot', {
  description: '.',
  type: SlotNexus,
  args: { id: nonNull(idArg()) },
  resolve (_, { id }, { currentUser, prisma }: Context) {
    return prisma.slot.findUnique({
      where: {
        id
      }
    })
  }
})