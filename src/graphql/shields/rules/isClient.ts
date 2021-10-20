import { UserType } from '.prisma/client'

import { rule } from 'graphql-shield'

import { Context } from '../../../shared/infra/graphql/setupGraphql'

export const isClient = rule()(async (parent, args, context: Context) => {
  if (context.currentUser!.type !== UserType.CLIENT) return new Error('Usuário não tem permissão de cliente')
  return true
})
