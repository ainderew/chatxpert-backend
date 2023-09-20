import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true }
})
export const MongoDBCustomer = mongoose.model('Customer', CustomerSchema)

class Customer {
  private customerId: string
  private username: string

  constructor() {
    this.customerId = ''
    this.username = ''
  }

  public setUsername(username: string) {
    this.username = username
  }

  public getUsername(): string {
    return this.username
  }

  public getCustomerId(): string {
    return this.customerId
  }

  public setCustomerId(customerId: string) {
    this.customerId = customerId
  }

  public async saveCustomerData(): Promise<void> {
    try {
      new MongoDBCustomer({
        customerId: this.customerId,
        username: this.username
      }).save()
    } catch (err) {
      throw err
    }
  }

  //   public async createCustomer(): Promise<void> {
  //     console.log('creating')
  //     const result = new MongoDBCustomer({ email: this.email, password: this.password })
  //     await result.save()
  //     this.customerID = result._id.toString()
  //   }

  //   public async readCustomer(): Promise<Customer | null> {
  //     const result: Customer | null = await MongoDBCustomer.findOne(
  //       { email: this.email, password: this.password },
  //       { _id: 1, email: 1 }
  //     )
  //     if (!result) return null
  //     console.log(result)
  //     return result
  //   }

  //   public async deleteCustomer(): Promise<void> {
  //     const result = await MongoDBCustomer.deleteOne({ email: this.email })
  //     console.log(result)
  //   }
}

export default Customer
