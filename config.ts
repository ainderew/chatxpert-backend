import dotenv from 'dotenv'
dotenv.config()

type Config = {
  DB_URL: string
  PORT: string
  SECRET: string
  MAIL_PASS: string
  MAIL_USER: string
}

const config: Config = {
  MAIL_PASS: process.env.mailpass || '',
  MAIL_USER: process.env.mailuser || '',
  DB_URL: process.env.dbURL || '',
  PORT: process.env.PORT || '3000',
  SECRET: process.env.secret || '',
}

export default config
