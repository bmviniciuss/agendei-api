import { DomainEvent } from '../domain/Event'
import { CreateEventDTO } from '../useCases/event/useCases/createEvent/CreateEventDTO'

export interface IEventRepository {
  create(data: CreateEventDTO): Promise<DomainEvent>
}
