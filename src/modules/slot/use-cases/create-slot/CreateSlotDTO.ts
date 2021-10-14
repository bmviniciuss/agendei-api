import { Slot } from '.prisma/client'

export type CreateSlotDTO = Pick<Slot, 'spaceId' | 'startTime' |'endTime' | 'numberOfClientsLimit'>
