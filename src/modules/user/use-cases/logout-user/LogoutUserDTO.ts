import { User } from '@prisma/client'

export type LogoutUserDTO = {
  userId: User['id']
}
