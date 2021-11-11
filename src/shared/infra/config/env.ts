import dotenv from 'dotenv'
dotenv.config()

export default {
  APP_PORT: 4000 || Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET || 'random_secret'
}
