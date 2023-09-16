import mongoose from 'mongoose'

const DatafileSchema = new mongoose.Schema({
  datafileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  datasetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dataset', required: true },
  originalname: { type: String },
  blobname: { type: String },
  path: { type: String },
  status: { type: Boolean },
  dateuploaded: { type: Date },
  datelastused: { type: Date }
})

const MongoDBDatafile = mongoose.model('Datafile', DatafileSchema)

class DatafileModel {
  private datafileId: string
  private datasetId: string
  private originalname: string
  private blobname: string
  private path: string
  private status: boolean
  private dateuploaded: Date
  private datelastused: Date

  constructor() {
    this.datafileId = ''
    this.datasetId = ''
    this.originalname = ''
    this.blobname = ''
    this.path = ''
    this.status = true
    this.dateuploaded = new Date()
    this.datelastused = new Date()
  }

  public getDatafileId() {
    return this.datafileId
  }

  public setDatasetId(datasetId: string) {
    this.datasetId = datasetId
  }

  public getDatasetId() {
    return this.datasetId
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
        datasetId: this.datasetId,
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

export default DatafileModel
