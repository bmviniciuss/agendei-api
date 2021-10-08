import { objectType } from 'nexus'

export const SlotNexus = objectType({
  name: 'Slot',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.int('usersLimit')
    t.nonNull.field('startTime', { type: 'DateTime' })
    t.nonNull.field('endTime', { type: 'DateTime' })
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
