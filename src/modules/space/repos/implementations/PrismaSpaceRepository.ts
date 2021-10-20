import { PrismaClient } from '@prisma/client'

import { DomainSpace } from '../../../../graphql/schema/space/domain/Space'
import { CreateSpaceDTO } from '../../useCases/space/createSpace/CreateSpaceDTO'
import { ISpaceRepository } from '../ISpaceRepository'

export class PrismaSpaceRepository implements ISpaceRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  async create (data: CreateSpaceDTO): Promise<DomainSpace> {
    const { ruleSet, ...spaceData } = data
    return this.prisma.space.create({
      data: {
        ...spaceData,
        ruleSet: {
          create: {
            ...ruleSet
          }
        }
      },
      include: {
        ruleSet: true
      }
    })
  }
}
