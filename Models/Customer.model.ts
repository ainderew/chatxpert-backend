import mongoose from 'mongoose'
import User from './User.model'

const CustomerSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true }
})
const MongoDBCustomer = mongoose.model('Customer', CustomerSchema)

class Customer {
  private customerID: string
  private username: string

  constructor() {
    this.customerID = ''
    this.username = ''
  }

  public setUsername(username: string) {
    this.username = username
  }

  public getUsername(): string {
    return this.username
  }

  public getCustomerId(): string {
    return this.customerID
  }

  public async saveCustomerData(): Promise<void> {
    try {
      new MongoDBCustomer({
        customerId: this.customerID,
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
