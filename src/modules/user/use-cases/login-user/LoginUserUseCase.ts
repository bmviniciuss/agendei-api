import { User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { HashComparer, Encrypter } from '../../../cryptography/protocols'
import { LoadUserByEmailRepository, LoginUserRepository } from '../../repos/UserRepository'
import { LoginUserDTO } from './LoginUserDTO'
import { LoginUserErrors } from './LoginUserErrors'

type Result = {
  user: User
  accessToken: string
}

export type LoginUserUseCaseResult = Result | null

export class LoginUserUseCase implements UseCase<LoginUserDTO, LoginUserUseCaseResult> {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly loginUserRepository: LoginUserRepository
  ) { }

  async execute (data: LoginUserDTO): Promise<LoginUserUseCaseResult> {
    const user = await this.loadUserByEmailRepository.loadByEmail(data.email)
    if (!user) {
      throw new LoginUserErrors.EmailOrPasswordInvalidError()
    }

    if (!user.active || !user.password) {
      throw new LoginUserErrors.EmailOrPasswordInvalidError()
    }

    const passwordMatches = await this.hashComparer.compare(data.password, user.password)

    if (!passwordMatches) {
      throw new LoginUserErrors.EmailOrPasswordInvalidError()
    }

    const accessToken = await this.encrypter.encrypt(user.id)
    const loggedUser = await this.loginUserRepository.login(user.id, accessToken)

    return { accessToken, user: loggedUser }
  }
}
