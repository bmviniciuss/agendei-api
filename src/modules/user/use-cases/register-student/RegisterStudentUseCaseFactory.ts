import { PrismaClient } from '.prisma/client'

import { prismaUserRepositoryFactory } from '../../repos/implementations/__factories__'
import { RegisterStudentUseCase } from './RegisterStudentUseCase'

export class RegisterStudentUseCaseFactory {
  constructor (private readonly prisma: PrismaClient) {}

  build (): RegisterStudentUseCase {
    const userRepository = prismaUserRepositoryFactory(this.prisma)
    return new RegisterStudentUseCase(userRepository, userRepository)
  }
}
