import { PrismaClient, User } from '@prisma/client'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Express } from 'express'

import { schema } from '../../../graphql/schema'

export interface Context {
  prisma: PrismaClient
  currentUser: User | null
}

async function getContext ({ req }: ExpressContext, prisma: PrismaClient): Promise<Context> {
  const context:Context = { prisma, currentUser: null }
  return context
}

export async function setupGraphql (app: Express, prisma: PrismaClient) {
  const apolloServer = new ApolloServer({
    schema,
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
