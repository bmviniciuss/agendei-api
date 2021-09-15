import { mutationField, inputObjectType, nonNull, arg } from 'nexus'

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

  resolve (_, { input }) {
    return null
  }
})
