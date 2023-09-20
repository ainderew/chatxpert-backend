import mongoose from 'mongoose'

const DatasetSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  activedata: { type: String }
})

const MongoDBDataset = mongoose.model('Dataset', DatasetSchema)

class Dataset {
  private dataId: string
  private businessId: string
  private activedata: string

  constructor() {
    this.dataId = ''
    this.businessId = ''
    this.activedata = ''
  }

  public getDataId() {
    return this.dataId
  }

  public setBusinessId(businessId: string) {
    this.businessId = businessId
  }

  public getBusinessId() {
    return this.businessId
  }

  public setActivedata(activedata: string) {
    this.activedata = activedata
  }

  public getActivedata() {
    return this.activedata
  }

  public async saveDatasetData(): Promise<void> {
    try {
      new MongoDBDataset({
        dataId: this.dataId,
        businessId: this.businessId,
        activedata: this.activedata
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default Dataset
