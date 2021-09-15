import { PrismaClient } from '.prisma/client'

import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { LogoutUserUseCase } from './LogoutUserUseCase'

export class LogoutUserUseCaseFactory {
  constructor (private readonly prisma: PrismaClient) {}

  build (): LogoutUserUseCase {
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    return new LogoutUserUseCase(userRepository)
  }
}
