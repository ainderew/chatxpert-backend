import nodemailer from 'nodemailer'
import { MongoDBUser } from "../Models/User.model";
import { AccountType } from '../Models/_enum';
import config from '../config';
import { Filter } from './types';
// dotenv.config()

interface EmailData {
  from: string
  to: string
  subject: string
  text: string
}

const configMail = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.MAIL_USER!,
    pass: config.MAIL_PASS!
  }
}

const send = (data: EmailData) => {
  const transporter = nodemailer.createTransport(configMail)
  transporter.sendMail(data, (err, info) => {
    if (err) console.log(err)
    else return info.response
  })
}



async function sendReminderEmail(){
  const businessEmails = (await MongoDBUser.find({type: AccountType.business}).lean()).map(business => business.email)

  const defaultReminder:EmailData = {
    from: config.MAIL_USER,
    subject: "Reminder",
    text: "Greetings! Your data might be outdated",
    to: ""
  }

  for(const email of businessEmails){
    defaultReminder.to = email
    send(defaultReminder)

  }
}

export default send
