import { PrismaClient, User } from '.prisma/client'

import { CreateSlotUseCase } from './CreateSlotUseCase'

export class CreateSlotUseCaseFactory {
  constructor (
    private readonly currentUser: User,
    private readonly prisma: PrismaClient
  ) {}

  build (): CreateSlotUseCase {
    return new CreateSlotUseCase(this.currentUser, this.prisma)
  }
}
