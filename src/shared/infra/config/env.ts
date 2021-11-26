import dotenv from 'dotenv'
dotenv.config()

export default {
  APP_PORT: Number(process.env.PORT) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'random_secret',
  ALLOW_INTROSPECTION: process.env.ALLOW_INTROSPECTION === 'true' ?? false
}
