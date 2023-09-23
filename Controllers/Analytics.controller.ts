import { Request, Response, response } from 'express'
import Analytics, { MongoDBCAnalytics } from '../Models/Analytics.model'

class AnalyticsController {
  public async createAnalytics(req: Request, res: Response): Promise<any> {
    const newAnalytics = new Analytics()

    const businessID = req.params.businessId
    console.log(businessID)
    newAnalytics.setBusinessId(businessID)
    newAnalytics.setClickCounts(0)
    try {
      const analyticsResult = new MongoDBCAnalytics(newAnalytics)
      await analyticsResult.save()
      res.status(200).json({ analyticsResult })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Bad Request' })
    }
  }
}
export default AnalyticsController
