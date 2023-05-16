
import dotenv from 'dotenv'
dotenv.config()

type Config = {
  DB_URL: string
  PORT: string
}

const config: Config = {
  DB_URL: process.env.dbURL || '',
  PORT: process.env.PORT || '3000'
}


export default config;