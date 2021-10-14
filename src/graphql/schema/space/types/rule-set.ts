import { RuleSetTypeEnum as RuleSetTypeEnumPrisma } from '@prisma/client'
import { enumType, objectType } from 'nexus'

export const RuleSetTypeEnum = enumType({
  name: 'RuleSetTypeEnum',
  members: Object.values(RuleSetTypeEnumPrisma)

})

export const SpaceRuleSetNexus = objectType({
  name: 'SpaceRuleSet',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.int('limit')
    t.nonNull.field('type', { type: RuleSetTypeEnum })

    t.nonNull.boolean('active')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  }
})
