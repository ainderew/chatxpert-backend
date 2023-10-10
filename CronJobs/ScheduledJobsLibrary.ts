import NotificationController from '../Controllers/Notification.controller'
import { jobType } from '../utils/types'

const notification = new NotificationController()


export const scheduledJobsLibrary: jobType[] = [
  { function: notification.sendReminderEmail, cronPattern: '* * * * *' },
  { function: notification.sendReminderEmail, cronPattern: '0 8 1 * *' },
  //butang ninyo are pre ug gusto mo naa idugang na function na scheduled
]
