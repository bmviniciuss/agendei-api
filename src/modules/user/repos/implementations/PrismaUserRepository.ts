import { PrismaClient, User, UserType } from '.prisma/client'

import { CreateStudentRepository, CreateStudentRepositoryDTO, LoadUserByEmailRepository, LoadUserFromIdRepository, LoginUserRepository } from '../UserRepository'

export class PrismaUserRepository implements
  LoadUserByEmailRepository,
  CreateStudentRepository,
  LoginUserRepository,
  LoadUserFromIdRepository {
  constructor (private readonly prisma: PrismaClient) { }

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

  async login (userId: string, accessToken: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        accessToken
      }
    })
  }

  async loadById (id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!user) return null
    return user
  }
}
