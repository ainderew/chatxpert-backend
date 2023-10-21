import mongoose from 'mongoose'

const BusinessSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, unique: true },
  size: { type: String },
  industry: { type: String, required: true },
  description: {type: String, required: true}
})

export const MongoDBBusiness = mongoose.model('Business', BusinessSchema)

class Business {
  private businessId: string
  private name: string
  private size: string
  private industry: string

  constructor() {
    this.businessId = ''
    this.name = ''
    this.size = ''
    this.industry = ''
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId
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

  public setSize(size: string): void {
    this.size = size
  }

  public getSize(): string {
    return this.size
  }

  public setIndustry(industry: string): void {
    this.industry = industry
  }

  public getIndustry(): string {
    return this.industry
  }
}

export default Business
