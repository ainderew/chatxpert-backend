import mongoose, { DateExpression } from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  notification: { type: String, required: true },
  isViewed: { type: Boolean },
  dateToNotify: { type: Date }
})

export const MongoDBCNotification = mongoose.model('Notification', NotificationSchema)

class Notification {
  private notificaionId: string
  private businessId: string
  private notification: string
  private isViewed: boolean
  private dateToNotify: Date

  constructor() {
    this.notificaionId = ''
    this.businessId = ''
    this.notification = ''
    this.isViewed = false
    this.dateToNotify = new Date()
  }

  public getNotificationId(): string {
    return this.notificaionId
  }

  public getBusinessId(): string {
    return this.businessId
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId
  }

  public getNotification(): string {
    return this.notification
  }

  public setNotification(notification: string) {
    this.notification = notification
  }

  public getIsViewed(): boolean {
    return this.isViewed
  }

  public setIsViewed(isViewed: boolean) {
    this.isViewed = isViewed
  }

  public getDateToNotify(): Date {
    return this.dateToNotify
  }

  public setDateToNotify(dateToNotify: Date) {
    this.dateToNotify = dateToNotify
  }

  //   public async saveNotificationData(): Promise<void> {
  //     try {
  //       new MongoDBCNotification({
  //		notificationId: this.notificationId
  //         	businessId: this.businessId
  //			notification: this.notification
  //			isViewed: this.isViewed
  //			dateToNotify: this.dateToNotify
  //       }).save()
  //     } catch (err) {
  //       throw err
  //     }
  //   }
}

export default Notification
