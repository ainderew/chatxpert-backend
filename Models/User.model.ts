import mongoose from 'mongoose'
import { AccountType } from './_enum'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true }
})
export const MongoDBUser = mongoose.model('User', UserSchema)

class User {
  private userid: string
  private email: string
  private password: string
  private type: AccountType

  constructor() {
    this.email = ''
    this.password = ''
    this.userid = ''
    this.type = AccountType.customer
  }

  public setEmail(email: string) {
    this.email = email
  }

  public getEmail(): string {
    return this.email
  }

  public setPassword(password: string) {
    this.password = password
  }

  public getPassword(): string {
    return this.password
  }

  public setType(type: AccountType) {
    this.type = type
  }

  public getType(): AccountType {
    return this.type
  }

  public setUserId(id: string) {
    this.userid = id
  }

  public getUserId(): string {
    return this.userid
  }
}

export default User
