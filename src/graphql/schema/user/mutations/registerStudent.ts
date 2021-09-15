
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { RegisterStudentUseCaseFactory } from '../../../../modules/user/use-cases/register-student/RegisterStudentUseCaseFactory'
import { Context } from '../../../../shared/infra/graphql/setupGraphql'

export const RegisterStudentInput = inputObjectType({
  name: 'RegisterStudentInput',
  definition (t) {
    t.nonNull.string('name')
    t.nonNull.string('email')
  }
})

export const RegisterStudentMutation = mutationField('registerStudent', {
  description: 'Register a user',
  type: 'User',

  args: {
    input: nonNull(arg({
      type: RegisterStudentInput
    }))
  },

  resolve (_, { input }, context: Context) {
    const useCase = new RegisterStudentUseCaseFactory(context.prisma).build()
    return useCase.execute(input)
  }
})
