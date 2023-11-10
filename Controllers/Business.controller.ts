import { NextFunction, Request, Response } from 'express'
import Business, { MongoDBBusiness } from '../Models/Business.model'
import UserController from './User.controller'
import { MongoDBCAnalytics } from '../Models/Analytics.model'
import AnalyticsController from './Analytics.controller'
import { MongoDBClick } from '../Models/Click.model'

class BusinessController {
  public async registerBusiness(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const user = new UserController()
    const newBusiness = new Business()
    const newAnalytics = new AnalyticsController()
    const { name, size, industry, location, website, photo, businessEmail, phoneNumber} = req.body

    try {
      const businessCheck = await MongoDBBusiness.find({ name })

      if (businessCheck.length) {
        next({ message: 'User credential already exists', status: 409 })
        return
      }

      const savedUser = await user.createNewUser(req, res, next)
      if (savedUser && savedUser._id) {
        newBusiness.setBusinessId(savedUser._id)
        newBusiness.setName(name)
        newBusiness.setSize(size)
        newBusiness.setIndustry(industry)
        newAnalytics.createAnalytics(savedUser._id)
        newBusiness.setLocation(location)
        newBusiness.setWebsite(website)
        newBusiness.setPhoto(photo)
        newBusiness.setBusinessEmail(businessEmail)
        newBusiness.setPhoneNumber(phoneNumber)
        console.log(newBusiness)
        const result = new MongoDBBusiness(newBusiness)
        await result.save()
        res.status(200).json(result)
      }
    } catch (error) {
      next({
        message:
          'User registration failed due to a potential server error. Try again later.',
        status: 500,
      })
    }
  }

  public async categorizeBusiness(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const year = parseInt(req.params.year, 10)
      const categorizedBusinesses = await MongoDBBusiness.aggregate([
        {
          $group: {
            _id: '$industry',
            businessIds: { $addToSet: '$businessId' },
          },
        },
      ])

      const result = await Promise.all(
        categorizedBusinesses.map(async (category) => {
          const businesses = category.businessIds
          let totalClickCount = 0
          const monthlyClicks = new Array(12).fill(0) // Initialize an array to hold monthly counts

          for (const bizz of businesses) {
            const analyticsres = await MongoDBCAnalytics.findOne({
              businessId: bizz,
            })

            if (analyticsres) {
              const { _id: analyticsId } = analyticsres
              const clicks = await MongoDBClick.find({
                analyticsId: analyticsId,
              }).exec()

              // Filter clicks by year
              const yearClicks = clicks.filter((click) => {
                const clickDate = new Date(click.dateclicked)
                return clickDate.getFullYear() == year
              })

              yearClicks.forEach((click) => {
                const clickDate = new Date(click.dateclicked)
                const month = clickDate.getMonth()
                monthlyClicks[month] += 1
              })

              totalClickCount += yearClicks.length
            }
          }

          return {
            industry: category._id,
            counts: totalClickCount,
            monthly: monthlyClicks,
          }
        }),
      )

      // Sort the result in descending order based on the 'counts' field
      result.sort((a, b) => b.counts - a.counts)

      res.status(200).json(result)
    } catch (error) {
      next({
        message: 'Failed to categorize businesses.',
        status: 500,
      })
    }
  }

  public async getAllBusiness(
    req: Request,
    res: Response,
    next: NextFunction,
  ){
    try{
      const businesses = await MongoDBBusiness.find().lean();
      res.status(200).json(businesses);
    }catch(error){
      next({
        message: 'Something went wrong',
        status: 500,
      })
    }
  }
}

export default BusinessController
