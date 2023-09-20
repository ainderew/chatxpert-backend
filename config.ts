import dotenv from 'dotenv'
dotenv.config()

type Config = {
  DB_URL: string
  PORT: string
  SECRET: string
}

const config: Config = {
  DB_URL: process.env.DB || '',
  PORT: process.env.PORT || '3000',
  SECRET: process.env.secret || ''
}

export default config
