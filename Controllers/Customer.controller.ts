import { Request, Response } from 'express'
import Customer, { MongoDBCustomer } from '../Models/Customer.model'
import UserController from './User.controller'

class CustomerController {
  public async registerCustomer(req: Request, res: Response) {
    const user = new UserController()
    const newCustomer = new Customer()
    const { username, birthdate } = req.body

    try {
      const savedUser = await user.createNewUser(req, res)
      if (savedUser && savedUser._id) {
        newCustomer.setCustomerId(savedUser._id)
        newCustomer.setUsername(username)
        newCustomer.setBirthdate(birthdate)
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
