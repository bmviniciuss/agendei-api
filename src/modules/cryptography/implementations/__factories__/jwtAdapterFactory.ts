import { JwtAdapter } from '..'

import env from '../../../../shared/infra/config/env'

export function jwtAdapterFactory (secret = env.JWT_SECRET) {
  return new JwtAdapter(secret)
}
