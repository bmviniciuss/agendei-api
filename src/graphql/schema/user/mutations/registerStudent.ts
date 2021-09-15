
import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

import { PrismaUserRepository } from '../../../../modules/user/repos/implementations/PrismaUserRepository'
import { RegisterStudentUseCase } from '../../../../modules/user/use-cases/register-student/RegisterStudentUseCase'
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
    const userRepository = new PrismaUserRepository(context.prisma)
    const useCase = new RegisterStudentUseCase(userRepository, userRepository)
    return useCase.execute(input)
  }
})
