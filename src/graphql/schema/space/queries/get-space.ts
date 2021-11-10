import { queryField, nonNull, idArg } from 'nexus'

import { SpaceNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const GetSpaceQuery = queryField('Space', {
  description: 'Get space',
  args: {
    spaceId: nonNull(idArg())
  },
  type: SpaceNexus,
  resolve  (_, { spaceId }, { prisma }: Context) {
    return prisma.space.findUnique({
      where: {
        id: spaceId
      }
    })
  }
})
