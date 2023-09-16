import mongoose from 'mongoose'
import User from './User.model'

const BusinessSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  size: { type: Number },
  industry: { type: String, required: true }
})

const MongoDBBusiness = mongoose.model('Business', BusinessSchema)

class BusinessModel {
  private businessId: string
  private name: string
  private size: number
  private industry: string

  constructor() {
    this.businessId = ''
    this.name = ''
    this.size = 0
    this.industry = ''
  }

  public getBusinessId(): string {
    return this.businessId
  }

  public setName(name: string): void {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public setSize(size: number): void {
    this.size = size
  }

  public getSize(): number {
    return this.size
  }

  public setIndustry(industry: string): void {
    this.industry = industry
  }

  public getIndustry(): string {
    return this.industry
  }

  public async saveBusinessData(): Promise<void> {
    try {
      new MongoDBBusiness({
        businessId: this.businessId,
        name: this.name,
        size: this.size
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default BusinessModel
