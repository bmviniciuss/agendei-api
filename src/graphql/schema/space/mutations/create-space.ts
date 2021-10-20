
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { RuleSetTypeEnum, SpaceNexus } from '..'

import { PrismaSpaceRepository } from '../../../../modules/space/repos/implementations/PrismaSpaceRepository'
import { CreateSpace } from '../../../../modules/space/useCases/space/createSpace/CreateSpace'
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

  async resolve (_, { input }, { prisma }: Context) {
    const spaceRepository = new PrismaSpaceRepository(prisma)
    const useCase = new CreateSpace(spaceRepository)
    return useCase.execute(input)
  }
})
