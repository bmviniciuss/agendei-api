import { allow, shield, and } from 'graphql-shield'

import { isAdmin, isAuthenticated } from './rules'

const DEBUG_ENABLED = process.env.NODE_ENV === 'dev'

const authenticatedAdminShield = and(isAuthenticated, isAdmin)

export const shields = shield({
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    '*': isAuthenticated,
    createDay: authenticatedAdminShield,
    createSlot: authenticatedAdminShield,
    registerUser: allow,
    loginUser: allow
  }
}, { debug: DEBUG_ENABLED, allowExternalErrors: true })
