import bcrypt from 'bcrypt'

import { HashComparer } from '../protocols'

export class BcryptAdapter implements HashComparer {
  compare (plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}
