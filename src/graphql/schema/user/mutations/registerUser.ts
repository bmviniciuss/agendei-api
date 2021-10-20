
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { RegisterUserUseCaseFactory } from '../../../../modules/user/use-cases/register-user/RegisterUserUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const RegisterUserInput = inputObjectType({
  name: 'RegisterUserInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('passwordConfirmation')
  }
})

export const RegisterUserMutation = mutationField('RegisterUser', {
  description: 'Registers a user',
  type: 'User',

  args: {
    input: nonNull(arg({
      type: RegisterUserInput
    }))
  },

  resolve (_, { input }, context: Context) {
    const useCase = new RegisterUserUseCaseFactory(context.prisma).build()
    return useCase.execute(input)
  }
})
