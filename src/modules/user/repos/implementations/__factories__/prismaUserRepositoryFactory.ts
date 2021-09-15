import { PrismaClient } from '.prisma/client'

import { PrismaUserRepository } from '../PrismaUserRepository'

export function prismaUserRepositoryFactory (prisma: PrismaClient) {
  return new PrismaUserRepository(prisma)
}
