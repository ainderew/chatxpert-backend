import mongoose from 'mongoose'

const DatasetSchema = new mongoose.Schema({
  dataId: { type: String },
  businessId: { type: String },
  datasetName: { type: String },
  category: { type: String },
  dataset: { type: String },
  status: { type: String },
  uploadDate: { type: Date }
})

const MongoDBDataset = mongoose.model('Dataset', DatasetSchema)

class DatasetModel {
  private dataId: string
  private businessId: string
  private datasetName: string
  private category: string
  private dataset: string
  private status: string
  private uploadDate: Date

  constructor() {
    this.dataId = ''
    this.businessId = ''
    this.datasetName = ''
    this.category = ''
    this.dataset = ''
    this.status = ''
    this.uploadDate = new Date()
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

  public setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  public getDatasetName() {
    return this.datasetName
  }

  public setCategory(category: string) {
    this.category = category
  }

  public getCategory() {
    return this.category
  }

  public setDataset(dataset: string) {
    this.dataset = dataset
  }

  public getDataset() {
    return this.dataset
  }

  public setStatus(status: string) {
    this.status = status
  }

  public getStatus() {
    return this.status
  }

  public async saveAnalyticsData(): Promise<void> {
    try {
      new MongoDBDataset({
        dataId: this.dataId,
        businessId: this.businessId,
        datasetName: this.datasetName,
        category: this.category,
        dataset: this.dataset,
        status: this.status,
        uploadDate: this.uploadDate
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default DatasetModel
