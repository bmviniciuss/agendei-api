import { PrismaClient } from '.prisma/client'

import { PrismaEventRepository } from '../../repos/implementations/PrismaEventRepository'
import { GetOccurrencesUseCase } from './GetOccurrencesUseCase'

export class GetOccurrencesUseCaseFactory {
  constructor (private readonly prisma: PrismaClient) {}

  build (): GetOccurrencesUseCase {
    const eventRepository = new PrismaEventRepository(this.prisma)
    return new GetOccurrencesUseCase(eventRepository)
  }
}
