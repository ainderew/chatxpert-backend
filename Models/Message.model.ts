import mongoose from 'mongoose'

const MessageScheme = new mongoose.Schema({
  channelId: { type: String },
  content: { type: String },
  timecreated: { type: Date },
  type: { type: Boolean }
})

const MongoDBMessage = mongoose.model('Message', MessageScheme)

class Message {
  private messageId: string
  private channelId: string
  private timecreated: Date
  private content: string
  private type: boolean

  constructor(content: string) {
    this.messageId = ''
    this.channelId = ''
    this.timecreated = new Date()
    this.content = content
    this.type = false
  }

  public setContent(messageContent: string): void {
    this.content = messageContent
  }

  public setChannelId(channelId: string): void {
    this.channelId = channelId
  }

  public setTimecreated(date: Date): void {
    this.timecreated = date
  }

  public setType(type: boolean): void {
    this.type = type
  }

  public getContent(): string {
    return this.content
  }

  public getMessageId(): string {
    return this.messageId
  }

  public getTimeCreated(): Date {
    return this.timecreated
  }

  public getChannelId(): string {
    return this.channelId
  }

  public getType(): boolean {
    return this.type
  }

  public saveMessage(): void {
    const message = new MongoDBMessage({
      channelId: this.channelId,
      content: this.content,
      type: this.type,
      timecreated: this.timecreated
    })
    message.save()

    this.messageId = message._id.toString()
  }
}

export default Message
