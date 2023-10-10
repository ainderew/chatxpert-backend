import { NextFunction, Request, Response } from 'express'
import Notification, { MongoDBCNotification } from '../Models/Notification.model'
import send from '../utils/mail'
import config from '../config'
import { MongoDBUser } from '../Models/User.model'
import { AccountType } from '../Models/_enum'
import htmlMailTemplate from '../utils/message'

class NotificationController {

  public async addNotification(email: string) {
    const newNotif = new Notification()
    try {
      const business = (await MongoDBUser.find({email})).map( user=> user._id)

      if(business.length){
        newNotif.setBusinessId(business[0].toString())
        newNotif.setNotification("You're uploaded information might be outdated. Please ensure that your information is up to date.")

        const result = new MongoDBCNotification(newNotif)
        await result.save()
      }
      } catch (error) {
        console.log(error)
    }
  }
  
  public async findBusinessNotifications(res: Response, req: Request, next: NextFunction) {
    const businessId = req.params.businessId
    try {

      const notificationList = await MongoDBCNotification.find({ businessId })

      res.status(200).json(notificationList)
    } catch (error) {
      next({message: "Internal Server Error. Please contact the administrator.", status:500 })
    }
  }

 public async sendReminderEmail() {
   try {
    const businessEmails = (await MongoDBUser.find({ type: AccountType.business }).lean()).map(
      business => business.email,
    )
  
    const defaultReminder = {
      from: config.MAIL_USER,
      subject: 'Monthly Update: Your data might be outdated',
      text: 'Greetings! Your data might be outdated',
      html: htmlMailTemplate,
      to: '',
    }
  
    for (const email of businessEmails) {
      defaultReminder.to = email
      send(defaultReminder)
      this.addNotification(email)
    }
    
  } catch (error) {
    console.log(error)  
  }
  }
  
}

export default NotificationController
