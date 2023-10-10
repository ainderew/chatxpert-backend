import cron from 'node-cron'
import { jobType } from '../utils/types'
import { scheduledJobsLibrary } from './ScheduledJobsLibrary'

export default function initializeScheduledJobs() {
  scheduledJobsLibrary.forEach((job: jobType) => {
    cron.schedule(job.cronPattern, job.function)
  })
}
