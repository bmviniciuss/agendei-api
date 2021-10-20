
import { mutationField, inputObjectType, nonNull, arg, objectType } from 'nexus'

import { LoginUserUseCaseFactory } from '../../../../modules/user/use-cases/login-user/LoginUserUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'
import { UserNexus } from '../types'

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  definition (t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const LoginUserResult = objectType({
  name: 'LoginUserResult',
  definition (t) {
    t.nonNull.string('accessToken')
    t.nonNull.field('user', {
      type: UserNexus
    })
  }
})

export const LoginUserMutation = mutationField('LoginUser', {
  description: 'Login a user',
  type: LoginUserResult,
  args: {
    input: nonNull(arg({
      type: LoginUserInput
    }))
  },

  resolve (_, { input }, context: Context) {
    const loginUserUseCase = new LoginUserUseCaseFactory(context.prisma).build()
    return loginUserUseCase.execute(input)
  }
})
