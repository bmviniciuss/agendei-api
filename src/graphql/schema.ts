import { DateTimeResolver } from 'graphql-scalars'
import {
  makeSchema as nexusMakeSchema,
  asNexusMethod
} from 'nexus'
import path from 'path'

import { loadModulesSchemas } from './helpers/loadModulesSchemas'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export async function makeSchema () {
  const moduleSchemas = await loadModulesSchemas()
  const schema = nexusMakeSchema({
    types: [
      DateTime,
      ...moduleSchemas
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
  return schema
}
