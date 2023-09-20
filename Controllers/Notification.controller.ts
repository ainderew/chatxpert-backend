import { Request, Response } from 'express'
import send from '../utils/mail'

class NotificationController {
  public async addNotification(res: Response, req: Request) {}
  public async findAllNotifications(res: Response, req: Request) {}
  public async findNotification(res: Response, req: Request) {}
  public async mailNotification(recipient: string, req: Request, res: Response) {
    const data = {
      from: 'mbark.gptai@gmail.com',
      to: recipient,
      subject: 'Update your Data',
      text: 'This is a test mail'
    }

    send(data)
    console.log(data)
    console.log('Successful')
    res.send('This the mail center')
  }
}

export default NotificationController
