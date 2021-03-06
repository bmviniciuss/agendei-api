import { allow, and, shield } from 'graphql-shield'

import { isAdmin, isAuthenticated } from './rules'
import { isClient } from './rules/isClient'

const DEBUG_ENABLED = process.env.NODE_ENV === 'dev'

const authenticatedAdminShield = and(isAuthenticated, isAdmin)
const authenticatedClientShield = and(isAuthenticated, isClient)

export const shields = shield({
  Query: {
    '*': isAuthenticated
  },
  Mutation: {
    '*': isAuthenticated,
    CreateSpace: authenticatedAdminShield,
    MakeReservation: authenticatedClientShield,
    RegisterUser: allow,
    LoginUser: allow
  },
  Occurrence: {
    '*': isAuthenticated
  },
  Space: {
    '*': isAuthenticated,
    tickets: authenticatedAdminShield
  }
}, { debug: DEBUG_ENABLED, allowExternalErrors: true })
