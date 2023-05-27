import mongoose from "mongoose";

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



  constructor() {
    this.email = '';
    this.password = ''
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

  public setCustomerId(id: string){
    this.customerID = id;
  }

  public getCustomerId(): string{
    return this.customerID
  }


  public async createCustomer(): Promise<void>{
    console.log("creating")
    const result = new MongoDBCustomer({email:this.email, password: this.password}) ;
    await result.save()
    this.customerID = result._id.toString();
  }

  public async readCustomer(): Promise<Customer | null>{
    const result: Customer | null =  await MongoDBCustomer.findOne({email: this.email, password: this.password}, {_id: 1, email:1});
    if(!result) return null;
    console.log(result)
    return result;
  }

  public async deleteCustomer(): Promise<void>{
    const result = await MongoDBCustomer.deleteOne({email: this.email})
    console.log(result)
  }


}

export default Customer;