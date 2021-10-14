import { list, nonNull, objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { SlotNexus } from '../../slot/types'

export const SpaceNexus = objectType({
  name: 'Space',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
    t.nonNull.boolean('active')
    t.field('slots', {
      type: list(nonNull(SlotNexus)),
      async resolve (root, _args, { prisma }: Context) {
        return prisma.slot.findMany({
          where: {
            spaceId: root.id
          }
        })
      }
    })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
