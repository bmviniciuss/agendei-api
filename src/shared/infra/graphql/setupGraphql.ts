import { PrismaClient, User } from '@prisma/client'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { Express } from 'express'

import { schema } from '../../../graphql/schema'
import { JwtEncrypterAdapter } from '../../../modules/cryptography/implementations'
import { PrismaUserRepository } from '../../../modules/user/repos/implementations/PrismaUserRepository'
import { LoadUserFromTokenUseCase } from '../../../modules/user/use-cases/load-user-from-token/LoadUserFromTokenUseCase'
import env from '../config/env'
import { getToken } from '../utils/getToken'

export interface Context {
  prisma: PrismaClient
  currentUser: User | null
}

async function getContext ({ req }: ExpressContext, prisma: PrismaClient): Promise<Context> {
  const context:Context = { prisma, currentUser: null }
  const token = getToken(req.get('Authorization'))
  if (!token) return context

  const userRepository = new PrismaUserRepository(prisma)
  const decrypter = new JwtEncrypterAdapter(env.JWT_SECRET)
  const currentUser = await new LoadUserFromTokenUseCase(
    decrypter,
    userRepository
  ).execute({ token })
  if (!currentUser) return context

  context.currentUser = currentUser
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
