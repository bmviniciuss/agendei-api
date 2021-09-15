import { DateTimeResolver } from 'graphql-scalars'
import {
  makeSchema,
  asNexusMethod
} from 'nexus'
import path from 'path'

import * as UserSchema from './schema/user'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [
    DateTime,
    UserSchema
  ],
  outputs: {
    schema: path.join(__dirname, '/../../generated/schema.graphql'),
    typegen: path.join(__dirname, '/../../generated/nexus.ts')
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
})
