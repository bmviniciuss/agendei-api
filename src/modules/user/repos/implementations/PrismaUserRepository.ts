import { PrismaClient, User, UserType } from '.prisma/client'

import { CreateStudentRepository, CreateStudentRepositoryDTO, LoadUserByEmailRepository } from '../UserRepository'

export class PrismaUserRepository implements LoadUserByEmailRepository, CreateStudentRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async loadByEmail (email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return user || null
  }

  async createStudent (data: CreateStudentRepositoryDTO): Promise<User | null> {
    const student = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        active: false,
        type: UserType.STUDENT
      }
    })
    if (!student) return null
    return student
  }
}
