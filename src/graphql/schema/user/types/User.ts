import { objectType } from 'nexus'

export const UserNexus = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
