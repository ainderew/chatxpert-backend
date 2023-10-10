import { sendReminderEmail } from '../utils/mail'
import { jobType } from '../utils/types'

function example() {
  console.log('I RUN EVERY MINUTE')
}

function exampleFunction() {
  console.log('I RUN EVERY HOUR')
}

export const scheduledJobsLibrary: jobType[] = [
  { function: example, cronPattern: '* * * * *' },
  { function: exampleFunction, cronPattern: '0 * * * *' },
  { function: sendReminderEmail, cronPattern: '0 8 1 * *' },
  //butang ninyo are pre ug gusto mo naa idugang na function na scheduled
]
