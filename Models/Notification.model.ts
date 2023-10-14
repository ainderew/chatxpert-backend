import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isViewed: { type: Boolean },
  dateNotified: { type: Date }
})

export const MongoDBCNotification = mongoose.model('Notification', NotificationSchema)

class Notification {
  private notificaionId: string
  private businessId: string
  private title: string
  private message: string
  private isViewed: boolean
  private dateNotified: Date

  constructor() {
    this.notificaionId = ''
    this.businessId = ''
    this.title = ''
    this.message = ''
    this.isViewed = false
    this.dateNotified = new Date()
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

  public getTitle(): string {
    return this.title
  }

  public setTitle(title: string) {
    this.title = title
  }

  public getMessage(): string {
    return this.message
  }

  public setMessage(message: string) {
    this.message = message
  }

  public getIsViewed(): boolean {
    return this.isViewed
  }

  public setIsViewed(isViewed: boolean) {
    this.isViewed = isViewed
  }

  public getDateNotified(): Date {
    return this.dateNotified
  }

  public setDateNotified(dateNotified: Date) {
    this.dateNotified = dateNotified
  }
}

export default Notification
