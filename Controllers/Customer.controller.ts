import { Request, Response } from 'express'
import Customer, { MongoDBCustomer } from '../Models/Customer.model'
import UserController from './User.controller'

class CustomerController {
  private customerModel: Customer

  constructor(CustomerModel: Customer) {
    this.customerModel = CustomerModel
  }

  public async registerCustomer(req: Request, res: Response) {
    const user = new UserController()
    const newCustomer = new Customer()
    const { username } = req.body

    try {
      const savedUser = await user.createNewUser(req, res)
      if (savedUser && savedUser._id) {
        newCustomer.setCustomerId(savedUser._id)
        newCustomer.setUsername(username)

        const result = new MongoDBCustomer(newCustomer)
        await result.save()
        res.status(200).json(result)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default CustomerController
