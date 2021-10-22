import { Event, Space } from '.prisma/client'

import { DomainEvent } from '../domain/Event'
import { DomainEventWithEventsInstaces } from '../domain/EventWithInstance'
import { DomainSpace } from '../domain/Space'
import { CreateEventDTO } from '../useCases/event/useCases/createEvent/CreateEventDTO'

export type SpaceId = Space['id']
export interface IEventRepository {
  create(data: CreateEventDTO): Promise<DomainEvent>
  listSpaceEvents(spaceId: SpaceId): Promise<DomainEvent[]>
  listSpaceEventsWithInstances(spaceIds?: SpaceId[]): Promise<DomainEventWithEventsInstaces[]>
  findById(id: Event['id']): Promise<DomainEvent & { space: DomainSpace } | null>
}
