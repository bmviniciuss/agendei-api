import { TEventWithDetails } from '../../../types'

import { EventInstance, Ticket as PrismaTicket } from '.prisma/client'

export type DomainTicket = PrismaTicket & {
  eventInstance: TEventWithDetails<EventInstance>
}
