
import { mutationField, inputObjectType, nonNull, arg, objectType } from 'nexus'

import { BcryptHasherAdapter, JwtEncrypterAdapter } from '../../../../modules/cryptography/implementations'
import { PrismaUserRepository } from '../../../../modules/user/repos/implementations/PrismaUserRepository'
import { LoginUserUseCase } from '../../../../modules/user/use-cases/login-user/LoginUserUseCase'
import env from '../../../../shared/infra/config/env'
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

export const LoginUserMutation = mutationField('loginUser', {
  description: 'Login a user',
  type: LoginUserResult,
  args: {
    input: nonNull(arg({
      type: LoginUserInput
    }))
  },

  resolve (_, { input }, context: Context) {
    const userRepository = new PrismaUserRepository(context.prisma)
    const hasher = new BcryptHasherAdapter()
    const jwt = new JwtEncrypterAdapter(env.JWT_SECRET)
    const useCase = new LoginUserUseCase(userRepository, hasher, jwt, userRepository)
    return useCase.execute(input)
  }
})
