import { queryField } from 'nexus'

import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const meQuery = queryField('me', {
  description: 'Get current user.',
  type: 'User',
  resolve (_, __, { currentUser, prisma }: Context) {
    if (!currentUser) return null
    return prisma.user.findUnique({
      where: {
        id: currentUser.id
      }
    })
  }
})
