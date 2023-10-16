import { NextFunction, Request, Response } from 'express'
import Notification, { MongoDBCNotification } from '../Models/Notification.model'
import send from '../utils/mail'
import config from '../config'
import { MongoDBUser } from '../Models/User.model'
import { AccountType } from '../Models/_enum'
import htmlMailTemplate from '../utils/message'

class NotificationController {

  public async addNotification(email: string, title: string, message: string): Promise<void> {
    const newNotif = new Notification()
    try {
      const business = (await MongoDBUser.find({email})).map( user=> user._id)

      if(business.length){
        newNotif.setBusinessId(business[0].toString())
        newNotif.setTitle(title)
        newNotif.setMessage(message)
        
        const result = new MongoDBCNotification(newNotif)
        await result.save()
        
      }
      } catch (error) {
        console.log(error)
    }
  }
  
  public async findBusinessNotifications( req: Request, res: Response,  next: NextFunction): Promise<any> {
    const businessId = req.params.businessId
    try {

      const notificationList = await MongoDBCNotification.find({ businessId })

      res.status(200).json(notificationList)
    } catch (error) {
      next({message: "Internal Server Error. Please contact the administrator.", status:500 })
    }
  }

  public async updateIsViewed( req: Request, res: Response,  next: NextFunction): Promise<any> {
    const { businessId } = req.body
    try {

      await MongoDBCNotification.updateMany({ businessId: businessId }, { $set: { isViewed: true } }) 

      res.status(200).json({message: "Updated Successfully"})
    } catch (error) {
      next({message: "Notifications are currently unavailable. Please try again later.", status:500 })
    }
  }

  public async checkHasView( req: Request, res: Response,  next: NextFunction): Promise<any> {
    const businessId = req.params.businessId
    try {
      const check= await MongoDBCNotification.count({ businessId: businessId, isViewed: false }) 

      res.status(200).json({count: check})
    } catch (error) {
      next({message: "Internal Server Error. Please contact the administrator.", status:500 })
    }
  }

 public async sendReminderEmail() {
  const myInstance = new NotificationController();
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

    if(businessEmails.length){
      const title = "Monthly Reminder: Data Update";
      const message = "You're uploaded information might be outdated. Please ensure that your information is up to date.";
      for (const email of businessEmails) {
        defaultReminder.to = email
        send(defaultReminder)
        void myInstance.addNotification(email, title, message)
      }
    }
    
  } catch (error) {
    console.log(error)  
  }
  }
  
}

export default NotificationController
