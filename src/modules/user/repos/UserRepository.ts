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
