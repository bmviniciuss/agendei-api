import { PrismaClient, User } from '.prisma/client'

import { CreateDayUseCase } from './CreateDayUseCase'

export class CreateDayUseCaseFactory {
  constructor (
    private readonly currentUser: User,
    private readonly prisma: PrismaClient
  ) {}

  build (): CreateDayUseCase {
    return new CreateDayUseCase(this.currentUser, this.prisma)
  }
}
