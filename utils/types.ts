export type Filter = {
  [key: string]: unknown
}

export type jobType = {
  function: () => any
  cronPattern: string
}

export type DataFileType = {
   datafileId: string
   businessId: string
   originalname: string
   blobname: string
   path: string
   status: boolean
   dateuploaded: Date
   datelastused: Date
}