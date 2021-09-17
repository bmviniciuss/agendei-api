import { PrismaClient, User } from '.prisma/client'

import {
  RegisterUserRepository,
  RegisterUserRepositoryDTO,
  LoadUserByEmailRepository,
  LoadUserFromIdRepository,
  LoginUserRepository,
  LogoutUserRepository
} from '../UserRepository'

export class PrismaUserRepository implements
  LoadUserByEmailRepository,
  RegisterUserRepository,
  LoginUserRepository,
  LoadUserFromIdRepository,
  LogoutUserRepository {
  constructor (private readonly prisma: PrismaClient) { }
  async loadByEmail (email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return user || null
  }

  async register (data: RegisterUserRepositoryDTO): Promise<User | null> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        active: true,
        type: data.type
      }
    })
    if (!user) return null
    return user
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

  async logout (userId: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        accessToken: null
      }
    })
  }
}
