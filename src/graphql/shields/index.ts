import { allow, shield, and } from 'graphql-shield'

import { isAdmin, isAuthenticated } from './rules'

const DEBUG_ENABLED = process.env.NODE_ENV === 'dev'

export const shields = shield({
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    '*': isAuthenticated,
    createDay: and(isAuthenticated, isAdmin),
    registerUser: allow,
    loginUser: allow
  }
}, { debug: DEBUG_ENABLED, allowExternalErrors: true })
