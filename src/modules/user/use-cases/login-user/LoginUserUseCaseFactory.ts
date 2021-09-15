import { PrismaClient } from '.prisma/client'

import { bcrypterAdapterFactory, jwtAdapterFactory } from '../../../cryptography/implementations/__factories__'
import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginUserUseCaseFactory {
  constructor (private readonly prisma: PrismaClient) {}

  build (): LoginUserUseCase {
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    const hasher = bcrypterAdapterFactory()
    const jwt = jwtAdapterFactory()
    return new LoginUserUseCase(userRepository, hasher, jwt, userRepository)
  }
}
