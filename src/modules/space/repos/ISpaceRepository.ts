import { DomainSpace } from '../domain/Space'
import { CreateSpaceDTO } from '../useCases/space/createSpace/CreateSpaceDTO'

export interface ISpaceRepository {
  create(data: CreateSpaceDTO): Promise<DomainSpace>
}
