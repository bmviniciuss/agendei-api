import { Day, PrismaClient, User } from '.prisma/client'

import endOfDay from 'date-fns/endOfDay'
import parseISO from 'date-fns/parseISO'
import startOfDay from 'date-fns/startOfDay'

import { UseCase } from '../../../../shared/core/UseCase'
import { CreateDayDTO } from './CreateDayDTO'

type CreateDayResult = Day

export class CreateDayUseCase implements UseCase<CreateDayDTO, CreateDayResult> {
  constructor (
    private readonly currentUser: User,
    private readonly prisma: PrismaClient
  ) {}

  async execute (data: CreateDayDTO): Promise<CreateDayResult> {
    const { date } = data
    const isoDate = date.toISOString()
    const parsedIso = parseISO(isoDate)
    const start = startOfDay(parsedIso)
    const end = endOfDay(parsedIso)

    const day = await this.prisma.day.findFirst({
      where: {
        date: {
          lte: end,
          gte: start
        }
      }
    })

    if (day) {
      throw new Error('JA TEM ESSE DIA')
    }

    return await this.prisma.day.create({
      data: {
        date: start,
        createdBy: {
          connect: {
            id: this.currentUser!.id
          }
        }
      }
    })
  }
}
