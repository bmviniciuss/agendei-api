
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { SpaceNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const CreateSpaceRuleSetInput = inputObjectType({
  name: 'CreateSpaceRuleSetInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
  }
})

export const CreateSpaceRuleSetMutation = mutationField('CreateSpaceRuleSet', {
  description: 'Create a space rule set',
  type: SpaceNexus,
  args: {
    input: nonNull(arg({
      type: CreateSpaceRuleSetInput
    }))
  },

  async resolve (_, { input }, { currentUser, prisma }: Context) {
    return prisma.space.create({
      data: {
        name: input.name,
        description: input.description,
        clientsPerSlot: input.clientsPerSlot
      }
    })
  }
})
