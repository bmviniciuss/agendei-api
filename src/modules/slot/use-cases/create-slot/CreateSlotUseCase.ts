import { PrismaClient, Slot, User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { CreateSlotDTO } from './CreateSlotDTO'

type CreateSlotResult = Slot

export class CreateSlotUseCase implements UseCase<CreateSlotDTO, CreateSlotResult> {
  constructor (
    private readonly currentUser: User,
    private readonly prisma: PrismaClient
  ) {}

  async execute (data: CreateSlotDTO): Promise<CreateSlotResult> {
    const { dayId, usersLimit, startTime, endTime } = data
    return this.prisma.slot.create({
      data: {
        usersLimit,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        day: {
          connect: {
            id: dayId
          }
        }
      }
    })
  }
}
