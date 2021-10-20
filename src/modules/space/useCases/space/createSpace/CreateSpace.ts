import { DomainSpace } from '../../../../../graphql/schema/space/domain/Space'
import { UseCase } from '../../../../../shared/core/UseCase'
import { ISpaceRepository } from '../../../repos/ISpaceRepository'
import { CreateSpaceDTO } from './CreateSpaceDTO'

export class CreateSpace implements UseCase<CreateSpaceDTO, any> {
  constructor (private readonly spaceRepository: ISpaceRepository) {}

  async execute (data: CreateSpaceDTO): Promise<DomainSpace> {
    return this.spaceRepository.create(data)
  }
}
