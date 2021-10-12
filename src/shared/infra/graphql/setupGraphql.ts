import { PrismaClient, User } from '@prisma/client'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Express } from 'express'
import { applyMiddleware } from 'graphql-middleware'

import { makeSchema } from '../../../graphql/schema'
import { shields } from '../../../graphql/shields'
import { LoadUserFromTokenUseCaseFactory } from '../../../modules/user/use-cases/load-user-from-token/LoadUserFromTokenUseCaseFactory'
import { getToken } from '../utils/getToken'

export interface Context {
  prisma: PrismaClient
  currentUser: User | null
}

async function getContext ({ req }: ExpressContext, prisma: PrismaClient): Promise<Context> {
  const context:Context = { prisma, currentUser: null }
  const token = getToken(req.get('Authorization'))
  if (!token) return context

  const loadUserFromTokenUseCase = new LoadUserFromTokenUseCaseFactory(prisma).build()
  const currentUser = await loadUserFromTokenUseCase.execute({ token })
  if (!currentUser) return context

  context.currentUser = currentUser
  return context
}

export async function setupGraphql (app: Express, prisma: PrismaClient) {
  const schema = await makeSchema()
  const shieldedSchema = applyMiddleware(schema, shields)
  const apolloServer = new ApolloServer({
    schema: shieldedSchema,
    context: (expressContext) => getContext(expressContext, prisma),
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
}
