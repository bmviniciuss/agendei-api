import { readdirSync } from 'fs'
import path from 'path'

export async function loadModulesSchemas () {
  const moduleNames = readdirSync(path.join(__dirname, '..', 'schema'))
  return Promise.all(
    moduleNames.map(async (moduleName) => {
      const moduleSchemas = await import(`../schema/${moduleName}`)
      return moduleSchemas
    })
  )
}
