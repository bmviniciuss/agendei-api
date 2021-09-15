import { User } from '@prisma/client'

export type RegisterStudentDTO = Pick<User, 'name' | 'email'>
