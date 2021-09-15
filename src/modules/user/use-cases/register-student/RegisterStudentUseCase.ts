import { User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { CreateStudentRepository, LoadUserByEmailRepository } from '../../repos/UserRepository'
import { RegisterStudentDTO } from './RegisterStudentDTO'
import { RegisterUserErrors } from './RegisterUserErros'

type RegisterStudentResult = User | null

export class RegisterStudentUseCase implements UseCase<RegisterStudentDTO, RegisterStudentResult> {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly createdStudentRepository: CreateStudentRepository
  ) {}

  async execute (data: RegisterStudentDTO): Promise<RegisterStudentResult> {
    const user = await this.loadUserByEmailRepository.loadByEmail(data.email)
    if (user) {
      throw new RegisterUserErrors.EmailInUseError()
    }
    // TODO: send email to user to set password
    return await this.createdStudentRepository.createStudent(data)
  }
}
