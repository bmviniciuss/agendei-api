import { objectType } from 'nexus'

export const DayNexus = objectType({
  name: 'Day',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.field('date', { type: 'DateTime' })
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
