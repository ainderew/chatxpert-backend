import { Request, Response } from 'express'
import Business, { MongoDBBusiness } from '../Models/Business.model'
import UserController from './User.controller'
import Analytics from '../Models/Analytics.model'
import AnalyticsController from './Analytics.controller'

class BusinessController {
  public async registerBusiness(req: Request, res: Response) {
    const user = new UserController()
    const newBusiness = new Business()
    const newAnalytics = new AnalyticsController()
    const { name, size, industry } = req.body

    try {
      const savedUser = await user.createNewUser(req, res)
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
      console.log(error)
    }
  }
}

export default BusinessController
