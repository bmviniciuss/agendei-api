import { UserType } from '.prisma/client'

import { rule } from 'graphql-shield'

import { Context } from '../../../shared/infra/graphql/setupGraphql'

export const isAdmin = rule()(async (parent, args, context: Context) => {
  if (context.currentUser!.type !== UserType.ADMIN) return new Error('Usuário não tem permissão')
  return true
})
