import mongoose from 'mongoose'

const BusinessSchema = new mongoose.Schema({
  businessId: { type: String },
  email: { type: String },
  password: { type: String },
  name: { type: String },
  size: { type: Number }
})

const MongoDBBusiness = mongoose.model('Business', BusinessSchema)

class BusinessModel {
  private businessId: string
  private email: string
  private password: string
  private name: string
  private size: number

  constructor() {
    this.businessId = ''
    this.email = ''
    this.password = ''
    this.name = ''
    this.size = 0
  }

  public setBusinessId(businessId: string): void {
    this.businessId = businessId
  }

  public getBusinessId(): string {
    return this.businessId
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public getEmail(): string {
    return this.email
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public getPassword(): string {
    return this.password
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

  public async saveAnalyticsData(): Promise<void> {
    try {
      new MongoDBBusiness({
        businessId: this.businessId,
        email: this.email,
        password: this.password,
        name: this.name,
        size: this.size
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default BusinessModel
