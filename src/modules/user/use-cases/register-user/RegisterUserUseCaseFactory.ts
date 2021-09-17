import { PrismaClient } from '.prisma/client'

import Joi from 'joi'

import { JoiValidatorAdapterFactory } from '../../../../shared/validation/implementations/JoiValidatorAdatperFactory'
import { bcrypterAdapterFactory } from '../../../cryptography/implementations/__factories__'
import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { RegisterUserUseCase } from './RegisterUserUseCase'

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
    const validator = new JoiValidatorAdapterFactory(this.validationSchema).build()
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    const hasher = bcrypterAdapterFactory()
    return new RegisterUserUseCase(validator, userRepository, hasher, userRepository)
  }
}
