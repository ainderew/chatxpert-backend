import { NextFunction, Request, Response } from 'express'
import Customer, { MongoDBCustomer } from '../Models/Customer.model'
import UserController from './User.controller'

class CustomerController {
  public async registerCustomer(req: Request, res: Response, next: NextFunction) {
    const user = new UserController()
    const newCustomer = new Customer()
    const { username, birthdate, age } = req.body

    try {
      const customerCheck = await MongoDBCustomer.find({username});

      if(customerCheck){
        next({message: "User credential already exists", status:409 })
        
      }

      const savedUser = await user.createNewUser(req, res, next)
      if (savedUser && savedUser._id) {
        newCustomer.setCustomerId(savedUser._id)
        newCustomer.setUsername(username)
        newCustomer.setBirthdate(birthdate)
        newCustomer.setAge(age)
        const result = new MongoDBCustomer(newCustomer)
        await result.save()
        res.status(200).json(result)
      }
    } catch (error) {
      console.log(error) 
      next(error)
    }
  }
}

export default CustomerController
