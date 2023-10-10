import dotenv from 'dotenv'
dotenv.config()

type Config = {
  DB_URL: string
  PORT: string
  SECRET: string
  MAIL_USER: string
  MAIL_PASS: string
}

const config: Config = {
  DB_URL: process.env.dbURL || '',
  PORT: process.env.PORT || '3000',
  SECRET: process.env.secret || '',
  MAIL_USER: process.env.MAIL_USER || 'default@gmail.com',
  MAIL_PASS: process.env.MAIL_PASS || '',
}

export default config
