import mongoose, { ObjectId } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  customerId: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
})
const MongoDBCustomer = mongoose.model('Customer', CustomerSchema);


class Customer {
  private customerID: string;
  private email: string;
  private password: string;
  private type: string;


  constructor() {
    this.email = '';
    this.password = ''
    this.type = ''
    this.customerID = ''
  }

  public setEmail(email:string){
    this.email = email;
  }

  public getEmail():string{
    return this.email
  }

  public setPassword(password: string){
    this.password = password;
  }

  public getPassword(): string{
    return this.password;
  }

  public getType(): string{
    return this.type
  }

  public getCustomerId(): string{
    return this.customerID
  }


  public async createCustomer(): Promise<void>{
    const result = new MongoDBCustomer({email:this.email, password: this.password}) ;
    await result.save()
  }

  public async readCustomer(): Promise<Customer | null>{
    console.log(this.email)
    const result: Customer | null =  await MongoDBCustomer.findOne({email: this.email, password: this.password});
    return result;
  }

  public async deleteCustomer(): Promise<void>{
    const result = await MongoDBCustomer.deleteOne({email: this.email})
    console.log(result)
  }


}

export default Customer;