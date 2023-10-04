import mongoose from 'mongoose'

const DatafileSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  originalname: { type: String },
  blobname: { type: String },
  path: { type: String },
  status: { type: Boolean },
  dateuploaded: { type: Date },
  datelastused: { type: Date }
})

export const MongoDBDatafile = mongoose.model('Datafile', DatafileSchema)

class Datafile {
  private datafileId: string
  private businessId: string
  private originalname: string
  private blobname: string
  private path: string
  private status: boolean
  private dateuploaded: Date
  private datelastused: Date

  constructor() {
    this.datafileId = ''
    this.businessId = ''
    this.originalname = ''
    this.blobname = ''
    this.path = ''
    this.status = false
    this.dateuploaded = new Date()
    this.datelastused = new Date()
  }

  public getFileId() {
    return this.datafileId
  }

  public getBusinessId() {
    return this.businessId
  }

  public setBusinessId(businessId: string) {
    this.businessId = businessId
  }

  public getOriginalname() {
    return this.originalname
  }

  public setOriginalname(originalname: string) {
    this.originalname = originalname
  }

  public getBlobname() {
    return this.blobname
  }

  public setBlobname(blobname: string) {
    this.blobname = blobname
  }

  public getPath() {
    return this.path
  }

  public setPath(path: string) {
    this.path = path
  }

  public setStatus(status: boolean) {
    this.status = status
  }

  public getStatus() {
    return this.status
  }

  public getDateuploaded(): Date {
    return this.dateuploaded
  }

  public setDateuploaded(dateuploaded: Date) {
    this.dateuploaded = dateuploaded
  }

  public getDatelastused(): Date {
    return this.datelastused
  }

  public setDatelastused(datelastused: Date) {
    this.datelastused = datelastused
  }

  public async saveDatafileData(): Promise<void> {
    try {
      new MongoDBDatafile({
        datafileId: this.datafileId,
        businessId: this.businessId,
        originalname: this.originalname,
        blobname: this.blobname,
        path: this.path,
        status: this.status,
        dateuploaded: this.dateuploaded,
        datelastused: this.datelastused
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default Datafile
