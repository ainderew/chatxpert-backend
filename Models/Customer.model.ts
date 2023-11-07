import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true, unique: false },
  age: { type: Number, required: true, unique: false }
})

export const MongoDBCustomer = mongoose.model('Customer', CustomerSchema)

class Customer {
  private customerId: string
  private username: string
  private birthdate: Date
  private age: number

  constructor() {
    this.customerId = ''
    this.username = ''
    this.birthdate = new Date();
    this.age = 13

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

  public getBirthdate(): Date {
    return this.birthdate
  }

  public setBirthdate(birthdate: Date) {
    this.birthdate = birthdate
  }

  public getAge(): number {
    return this.age
  }

  public setAge(age: number) {
    this.age = age
  }

  public async saveCustomerData(): Promise<void> {
    try {
      new MongoDBCustomer({
        customerId: this.customerId,
        username: this.username,
        birthdate: this.birthdate,
        age: this.age
      }).save()
    } catch (err) {
      throw err
    }
  }
}

export default Customer
