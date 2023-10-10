import cron from 'node-cron'
import { jobType } from '../utils/types'
import { scheduledJobsLibrary } from './ScheduledJobsLibrary'

export default function initializeScheduledJobs() {
  console.log('initialize')
  scheduledJobsLibrary.forEach((job: jobType) => {
    cron.schedule(job.cronPattern, job.function)
  })
}
