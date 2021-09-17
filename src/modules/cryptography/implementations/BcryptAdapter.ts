import bcrypt from 'bcrypt'

import { HashComparer, Hasher } from '../protocols'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }

  compare (plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}
