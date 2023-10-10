export type Filter = {
  [key: string]: unknown
}

export type jobType = {
  function: () => any
  cronPattern: string
}
