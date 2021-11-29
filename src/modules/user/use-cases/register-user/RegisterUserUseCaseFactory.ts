import { PrismaClient } from '.prisma/client'

import * as Yup from 'yup'
import Joi from 'joi'

import { JoiValidatorAdapterFactory } from '../../../../shared/validation/implementations/JoiValidatorAdatperFactory'
import { bcrypterAdapterFactory } from '../../../cryptography/implementations/__factories__'
import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { RegisterUserUseCase } from './RegisterUserUseCase'
import { YupValidatorAdapter } from '../../../../shared/validation/implementations/YupValidatorAdapter'

export class RegisterUserUseCaseFactory {
  private readonly validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    passwordConfirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('passwordConfirmation')
      .messages({ 'any.only': '{{#label}} does not match' })
  })

  constructor (private readonly prisma: PrismaClient) {}

  build (): RegisterUserUseCase {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(5).required(),
      passwordConfirmation: Yup.string()
        .required()
        .test('password-match', 'As senhas devem ser iguais', function (value) {
          return this.parent.password === value
        })
    })

    const validator = new YupValidatorAdapter(schema)
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    const hasher = bcrypterAdapterFactory()
    return new RegisterUserUseCase(validator, userRepository, hasher, userRepository)
  }
}
