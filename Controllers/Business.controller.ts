import { NextFunction, Request, Response } from 'express'
import Business, { MongoDBBusiness } from '../Models/Business.model'
import UserController from './User.controller'

class BusinessController {
  public async registerBusiness(req: Request, res: Response, next:NextFunction) {
    const user = new UserController()
    const newBusiness = new Business()
    const { name, size, industry } = req.body

    try {
      const businessCheck = await MongoDBBusiness.find({name});

      if(businessCheck){
        next({message: "User credential already exists", status:409 })
      }

      const savedUser = await user.createNewUser(req, res, next)
      if (savedUser && savedUser._id) {
        newBusiness.setBusinessId(savedUser._id)
        newBusiness.setName(name)
        newBusiness.setSize(size)
        newBusiness.setIndustry(industry)

        const result = new MongoDBBusiness(newBusiness)
        await result.save()
        res.status(200).json(result)
      }
    } catch (error) {
      next(error)
    }
  }
}

export default BusinessController
