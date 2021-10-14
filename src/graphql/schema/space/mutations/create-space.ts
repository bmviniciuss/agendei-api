
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { RuleSetTypeEnum, SpaceNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const CreateSpaceRuleSetInput = inputObjectType({
  name: 'CreateSpace_RuleSetInput',
  definition (t) {
    t.nonNull.int('limit')
    t.nonNull.field('type', {
      type: RuleSetTypeEnum
    })
  }
})

export const CreateSpaceInput = inputObjectType({
  name: 'CreateSpaceInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
    t.nonNull.field('ruleSet', {
      type: CreateSpaceRuleSetInput
    })
  }
})

export const CreateSpaceMutation = mutationField('CreateSpace', {
  description: 'Allows a ADMIN to create a space for a company ',
  type: SpaceNexus,
  args: {
    input: nonNull(arg({
      type: CreateSpaceInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    const { name, description, clientsPerSlot, ruleSet } = input
    return prisma.space.create({
      data: {
        name: name,
        description: description,
        clientsPerSlot: clientsPerSlot,
        ruleSet: {
          create: {
            limit: ruleSet.limit,
            type: ruleSet.type
          }
        }
      },
      include: {
        ruleSet: true
      }
    })
  }
})
