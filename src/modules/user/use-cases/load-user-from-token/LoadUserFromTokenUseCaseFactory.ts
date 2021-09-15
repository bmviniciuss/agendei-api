import { PrismaClient } from '.prisma/client'

import { jwtAdapterFactory } from '../../../cryptography/implementations/__factories__'
import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { LoadUserFromTokenUseCase } from './LoadUserFromTokenUseCase'

export class LoadUserFromTokenUseCaseFactory {
  constructor (private readonly prisma: PrismaClient) {}

  build (): LoadUserFromTokenUseCase {
    const decrypter = jwtAdapterFactory()
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    return new LoadUserFromTokenUseCase(decrypter, userRepository)
  }
}
