import { User } from '@prisma/client'

export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<User | null>
}

export type CreateStudentRepositoryDTO = {
  name: string
  email: string
}

export interface CreateStudentRepository {
  createStudent(data: CreateStudentRepositoryDTO): Promise<User | null>
}

export interface LoginUserRepository {
  login(userId: User['id'], accessToken: string): Promise<User>
}

export interface LoadUserFromIdRepository {
  loadById(id: User['id']): Promise<User | null>
}

export interface LogoutUserRepository {
  logout(userId: User['id']): Promise<User>
}
