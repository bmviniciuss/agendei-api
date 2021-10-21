import { UseCase } from '../../../../../../shared/core/UseCase'
import { DomainEvent } from '../../../../domain/Event'
import { IEventRepository } from '../../../../repos/IEventRepository'
import { ListSpaceEventsDTO } from './ListSpaceEventsDTO'

export class ListSpaceEvents implements UseCase<ListSpaceEventsDTO, DomainEvent[]> {
  constructor (private readonly eventRepository: IEventRepository) {
  }

  async execute (data: ListSpaceEventsDTO): Promise<DomainEvent[]> {
    return this.eventRepository.listSpaceEvents(data.spaceId)
  }
}
