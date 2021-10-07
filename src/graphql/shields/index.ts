import { allow, shield } from 'graphql-shield'

import { isAuthenticated } from './rules/isAuthenticated'

const DEBUG_ENABLED = process.env.NODE_ENV === 'dev'

export const shields = shield({
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    '*': isAuthenticated,
    registerUser: allow,
    loginUser: allow
  }
}, { debug: DEBUG_ENABLED, allowExternalErrors: true })
