import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

interface EmailData {
  from: string
  to: string
  subject: string
  text: string
}

const config = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!
  }
}

const send = (data: EmailData) => {
  const transporter = nodemailer.createTransport(config)
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err)
    else return info.response
  })
}

export default send
