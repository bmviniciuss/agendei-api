import express from 'express'

import env from '../config/env'

const server = express()

server.get('/', (req, res) => {
  return res.json({ ok: 'true ' }).status(200)
})

server.listen(env.APP_PORT, () => {
  console.log(`Server listening on http://localhost:${env.APP_PORT}`)
})
