import { User } from '.prisma/client'

import { UseCase } from '../../../../shared/core/UseCase'
import { Decrypter } from '../../../cryptography/protocols'
import { LoadUserFromIdRepository } from '../../repos/UserRepository'
import { LoadUserFromTokenDTO } from './LoadUserFromTokenDTO'

export type LoadUserFromTokenResult = User | null

type AuthTokenPayload = {
  sub: string
  iat: number
} | null

export class LoadUserFromTokenUseCase implements UseCase<LoadUserFromTokenDTO, LoadUserFromTokenResult> {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserFromId: LoadUserFromIdRepository
  ) { }

  async execute ({ token }: LoadUserFromTokenDTO): Promise<LoadUserFromTokenResult> {
    const payload = await this._verifyToken(token)
    if (!payload) return null

    const currentUser = await this.loadUserFromId.loadById(payload.sub)
    if (!currentUser) return null
    if (!currentUser.accessToken) return null
    if (currentUser.accessToken !== token) return null
    return currentUser
  }

  private async _verifyToken (token: string): Promise<AuthTokenPayload | null> {
    try {
      const payload = await this.decrypter.decrypt(token)
      return this._formatTokenPayload(payload)
    } catch (error) {
      return null
    }
  }

  private _formatTokenPayload (payload: any): AuthTokenPayload {
    return {
      iat: payload.iat,
      sub: payload.sub
    }
  }
}
