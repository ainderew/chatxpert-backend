import { NextFunction, Request, Response } from 'express'
import Business, { MongoDBBusiness } from '../Models/Business.model'
import UserController from './User.controller'
import Analytics from '../Models/Analytics.model'
import AnalyticsController from './Analytics.controller'

class BusinessController {
  public async registerBusiness(req: Request, res: Response, next:NextFunction) {
    const user = new UserController()
    const newBusiness = new Business()
    const newAnalytics = new AnalyticsController()
    const { name, size, industry } = req.body

    try {
      const businessCheck = await MongoDBBusiness.find({name});

      if(businessCheck.length){
        next({message: "User credential already exists", status:409 })
        return
      }

      const savedUser = await user.createNewUser(req, res, next)
      if (savedUser && savedUser._id) {
        newBusiness.setBusinessId(savedUser._id)
        newBusiness.setName(name)
        newBusiness.setSize(size)
        newBusiness.setIndustry(industry)
        newAnalytics.createAnalytics(savedUser._id)
        
        const result = new MongoDBBusiness(newBusiness)
        await result.save()
        res.status(200).json(result)
      }
    } catch (error) {
      next({message: "Internal Server Error. Please contact the administrator.", status:500 })
    }
  }
}

export default BusinessController
