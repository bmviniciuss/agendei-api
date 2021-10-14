import { queryField, nonNull, list } from 'nexus'

import { SpaceNexus } from '..'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const GetSpacesQuery = queryField('GetSpaces', {
  description: 'Get all spaces',
  type: list(nonNull(SpaceNexus)),
  resolve (_, _args, { prisma }: Context) {
    return prisma.space.findMany({
      where: {
        active: true
      },
      include: {
        ruleSet: true
      }
    })
  }
})
