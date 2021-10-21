import { Space } from '.prisma/client'

import { DomainEvent } from '../domain/Event'
import { CreateEventDTO } from '../useCases/event/useCases/createEvent/CreateEventDTO'

export interface IEventRepository {
  create(data: CreateEventDTO): Promise<DomainEvent>
  listSpaceEvents(spaceId: Space['id']): Promise<DomainEvent[]>
}
