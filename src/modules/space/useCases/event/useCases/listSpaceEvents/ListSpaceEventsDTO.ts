import { Space } from '@prisma/client'

export type ListSpaceEventsDTO = {
  spaceId: Space['id']
}
