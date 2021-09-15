import { PrismaClient } from '@prisma/client'
import { Express } from 'express'

import env from '../config/env'
import { makeExpressApp } from '../config/makeExpressApp'
import { setupGraphql } from '../graphql/setupGraphql'

function runServer (app: Express) {
  const PORT = env.APP_PORT
  app.listen({ port: PORT }, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${PORT}/graphql`)
  })
}

async function bootstrap () {
  const prisma = new PrismaClient()
  const app = makeExpressApp()
  await setupGraphql(app, prisma)
  runServer(app)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
bootstrap().then(() => {})
