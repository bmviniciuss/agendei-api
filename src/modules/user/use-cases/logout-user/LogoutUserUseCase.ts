import { UseCase } from '../../../../shared/core/UseCase'
import { LogoutUserRepository } from '../../repos/UserRepository'
import { LogoutUserDTO } from './LogoutUserDTO'

export type LogoutUserUseCaseResult = Boolean

export class LogoutUserUseCase implements UseCase<LogoutUserDTO, LogoutUserUseCaseResult> {
  constructor (
    private readonly logoutUserRepository: LogoutUserRepository
  ) { }

  async execute (data: LogoutUserDTO): Promise<LogoutUserUseCaseResult> {
    const user = await this.logoutUserRepository.logout(data.userId)
    return !!user
  }
}
