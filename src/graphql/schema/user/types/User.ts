import { UserType } from '@prisma/client'
import { objectType, enumType } from 'nexus'

export const UserNexusTypeEnum = enumType({
  name: 'UserType',
  members: Object.values(UserType)
})

export const UserNexus = objectType({
  name: 'User',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('email')
    t.nonNull.string('name')
    t.nonNull.boolean('active')
    t.nonNull.field('type', { type: UserNexusTypeEnum })
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
