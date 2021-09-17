import { User } from '@prisma/client'

export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<User | null>
}

export type RegisterUserRepositoryDTO = Pick<User, 'name' | 'email' | 'password' | 'type'>

export interface RegisterUserRepository {
  register(data: RegisterUserRepositoryDTO): Promise<User | null>
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
