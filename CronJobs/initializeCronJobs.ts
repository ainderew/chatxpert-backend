import cron from 'node-cron';


scheduledJobsLibrary.forEach((job) =>{
  cron.schedule(job.cronPattern, job.function);
})


