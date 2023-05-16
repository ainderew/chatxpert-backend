import Customer from "../Models/Customer.model";


class CustomerController {
  private customerModel: Customer
  private test: string



  constructor(CustomerModel: Customer){
    this.customerModel = CustomerModel
    this.test = 'test'
  }


  public getRegisterData = async(req: any,res:any):Promise<void> => {
    const { email, password} = req.body;

    this.customerModel.setEmail(email)
    this.customerModel.setPassword(password)
    this.customerModel.createCustomer();
  }

  public loginUser = async(req: any,res:any):Promise<void> => {
    //get from view
    const { email, password, type} = req.body;

    //instance of customer model
    this.customerModel.setEmail(email)
    this.customerModel.setPassword(password);
    const dbCustomer = await this.customerModel.readCustomer();

    if(dbCustomer){
      res.send({status: 'ok'})
    }else{
      res.send({status: 'no user found'})
    }

  }
  
  public getTest(): string {
    return this.test
  }


  
}

export default CustomerController;