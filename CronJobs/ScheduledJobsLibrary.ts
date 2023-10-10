function example() {
  console.log('I RUN EVERY MINUTE')
}

function exampleFunction() {
  console.log('I RUN EVERY HOUR')
}

const scheduledJobsLibrary = [
  { function: example, cronPattern: '* * * * *' },
  { function: exampleFunction, cronPattern: '0 * * * *' },
  { function: exampleFunction, cronPattern: '0 8 1 * *' },
  //butang ninyo are pre ug gusto mo naa idugang na function na scheduled
]
