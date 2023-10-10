import { Request, Response, response } from 'express'
import Analytics, { MongoDBCAnalytics } from '../Models/Analytics.model'

class AnalyticsController {
  public async createAnalytics(businessID: string): Promise<any> {
    const newAnalytics = new Analytics()
    
   
    console.log(businessID)
    newAnalytics.setBusinessId(businessID)
    newAnalytics.setClickCounts(0)
    try {
      const analyticsResult = new MongoDBCAnalytics(newAnalytics)
      await analyticsResult.save()
   
    } catch (error) {
      console.log(error)
      console.error(error)
    }
  }

}

export default AnalyticsController
