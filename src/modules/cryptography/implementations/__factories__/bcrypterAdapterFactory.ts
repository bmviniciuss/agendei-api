import { BcryptAdapter } from '..'

export function bcrypterAdapterFactory (salt = 10) {
  return new BcryptAdapter()
}
