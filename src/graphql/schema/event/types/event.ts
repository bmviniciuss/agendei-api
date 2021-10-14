import { objectType } from 'nexus'

export const EventNexus = objectType({
  name: 'Slot',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.int('numberOfClientsLimit')
    t.nonNull.field('startTime', { type: 'DateTime' })
    t.nonNull.field('endTime', { type: 'DateTime' })
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
