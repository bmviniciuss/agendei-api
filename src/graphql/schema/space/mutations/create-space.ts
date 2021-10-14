
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { SpaceNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const CreateSpaceInput = inputObjectType({
  name: 'CreateSpaceInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nonNull.int('clientsPerSlot')
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
    return prisma.space.create({
      data: {
        name: input.name,
        description: input.description,
        clientsPerSlot: input.clientsPerSlot
      }
    })
  }
})
