import nodemailer from 'nodemailer'
import config from '../config'


interface EmailData {
  from: string
  to: string
  subject: string
  text: string
  html:string
}

const configMail = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.MAIL_USER!,
    pass: config.MAIL_PASS!,
  },
}

const send = (data: EmailData) => {
  const transporter = nodemailer.createTransport(configMail)
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err)
    else {
      return info.response
    }
  })
}


export default send
