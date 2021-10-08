import { Slot } from '.prisma/client'

export type CreateSlotDTO = Pick<Slot, 'dayId' | 'startTime' |'endTime' | 'usersLimit'>
