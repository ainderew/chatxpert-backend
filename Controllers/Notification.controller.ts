import { NextFunction, Request, Response } from 'express'
import Notification, { MongoDBCNotification } from '../Models/Notification.model'
import send from '../utils/mail'
import config from '../config'
import { MongoDBUser } from '../Models/User.model'
import { AccountType } from '../Models/_enum'
import htmlMailTemplate from '../utils/message'

class NotificationController {

  public async addNotification(email: string): Promise<void> {
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
    const businessId = req.params.businessId
    try {

      await MongoDBCNotification.updateMany({ businessId: businessId }, { $set: { isViewed: true } }) 

      res.status(200).json()
    } catch (error) {
      next({message: "Internal Server Error. Please contact the administrator.", status:500 })
    }
  }

  public async checkHasView( req: Request, res: Response,  next: NextFunction): Promise<any> {
    const businessId = req.params.businessId
    try {
      let hasViews = false;
      const check= await MongoDBCNotification.find({ businessId: businessId, isViewed: true }) 

      if(check.length){
        hasViews = true
      }

      res.status(200).json({hasView: hasViews})
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
      for (const email of businessEmails) {
        defaultReminder.to = email
        send(defaultReminder)
        void myInstance.addNotification(email)
      }
    }
    
  } catch (error) {
    console.log(error)  
  }
  }
  
}

export default NotificationController
