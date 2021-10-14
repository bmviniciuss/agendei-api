import { objectType } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { SpaceRuleSetNexus } from './rule-set'

export const SpaceNexus = objectType({
  name: 'Space',
  definition (t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
    t.nonNull.boolean('active')
    t.field('ruleSet', {
      type: SpaceRuleSetNexus,
      async resolve (root, _args, { prisma }:Context) {
        return prisma.spaceRuleSet.findUnique({
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
