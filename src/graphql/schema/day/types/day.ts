import { objectType, list, nonNull } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { SlotNexus } from './slot'

export const DayNexus = objectType({
  name: 'Day',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.field('date', { type: 'DateTime' })
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('slots', {
      type: list(nonNull(SlotNexus)),
      resolve (root, _args, { prisma }: Context) {
        return prisma.slot.findMany({
          where: {
            dayId: root.id
          },
          orderBy: {
            start: 'asc'
          }
        })
      }
    })
  }
})
