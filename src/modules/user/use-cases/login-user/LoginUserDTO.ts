import { User } from '@prisma/client'

export type LoginUserDTO = {
  email: string
  password: string
}
