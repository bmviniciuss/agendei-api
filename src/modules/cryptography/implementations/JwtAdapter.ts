import jwt from 'jsonwebtoken'

import { Encrypter, Decrypter } from '../protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}
  async encrypt (plaintext: string): Promise<string> {
    const token = jwt.sign({ sub: plaintext }, this.secret)
    return Promise.resolve(token)
  }

  async decrypt (digest: string): Promise<any> {
    return jwt.verify(digest, this.secret) as any
  }
}
