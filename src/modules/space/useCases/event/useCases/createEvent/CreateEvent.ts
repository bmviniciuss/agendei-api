import { UseCase } from '../../../../../../shared/core/UseCase'
import { DomainEvent } from '../../../../domain/Event'
import { IEventRepository } from '../../../../repos/IEventRepository'
import { CreateEventDTO } from './CreateEventDTO'

export class CreateEvent implements UseCase<CreateEventDTO, DomainEvent> {
  constructor (private readonly eventRepository: IEventRepository) {
  }

  execute (data: CreateEventDTO): Promise<DomainEvent> {
    return this.eventRepository.create(data)
  }
}
