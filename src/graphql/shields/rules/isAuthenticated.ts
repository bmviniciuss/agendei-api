import { rule } from 'graphql-shield'

import { UnauthenticatedError } from '../../../shared/errors'
import { Context } from '../../../shared/infra/graphql/setupGraphql'

export const isAuthenticated = rule()(async (parent, args, context: Context) => {
  if (!context.currentUser) return new UnauthenticatedError()
  return true
})
