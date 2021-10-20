
import { mutationField } from 'nexus'

import { LogoutUserUseCaseFactory } from '../../../../modules/user/use-cases/logout-user/LogouUserUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const logoutUser = mutationField('LogoutUser', {
  description: 'Logout user',
  type: 'Boolean',
  resolve (_, __, { currentUser, prisma }: Context) {
    if (!currentUser) return true
    const useCase = new LogoutUserUseCaseFactory(prisma).build()
    return useCase.execute({ userId: currentUser.id })
  }
})
