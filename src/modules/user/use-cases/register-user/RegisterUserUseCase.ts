import { User, UserType } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { Validator } from '../../../../shared/validation/Validator'
import { Hasher } from '../../../cryptography/protocols'
import { RegisterUserRepository, LoadUserByEmailRepository, RegisterUserRepositoryDTO } from '../../repos/UserRepository'
import { RegisterUserDTO } from './RegisterUserDTO'
import { RegisterUserErrors } from './RegisterUserErros'

type RegisterUserResult = User | null

export class RegisterUserUseCase implements UseCase<RegisterUserDTO, RegisterUserResult> {
  constructor (
    private readonly validator: Validator,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
    private readonly registerUserRepository: RegisterUserRepository
  ) {}

  async execute (data: RegisterUserDTO): Promise<RegisterUserResult> {
    this.validator.validate(data)

    const user = await this.loadUserByEmailRepository.loadByEmail(data.email)
    if (user) {
      throw new RegisterUserErrors.EmailInUseError()
    }

    const hashedPassword = await this.hasher.hash(data.password)
    const dto: RegisterUserRepositoryDTO = {
      email: data.email,
      name: data.name,
      password: hashedPassword,
      type: UserType.CLIENT
    }

    return await this.registerUserRepository.register(dto)
  }
}
