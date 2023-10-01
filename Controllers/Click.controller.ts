import { Request, Response } from 'express'
import Click, { MongoDBClick } from '../Models/Click.model'
import Analytics, { MongoDBCAnalytics } from '../Models/Analytics.model'

class ClickController {
  public async createClick(req: Request, res: Response): Promise<any> {
    const newClick = new Click()
    const date = new Date()
    const businessId = req.params.businessId

    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId })
    const { _id: analyticsId } = analyticsres[0]
    newClick.setAnalyticsId(analyticsId + '' || '')
    newClick.setDateclicked(date)
    try {
      const result = new MongoDBClick(newClick)
      await result.save()
      await MongoDBCAnalytics.updateOne({ _id: analyticsId }, { $inc: { clickCounts: 1 } })
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Bad Request' })
    }
  }

  public async getClicksById(req: Request, res: Response): Promise<any> {
    const businessId = req.params.businessId
    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId })
    const { _id: analyticsId } = analyticsres[0] 


    try {
      const clicks = await MongoDBClick.find({ analyticsId: analyticsId }).exec()

      res.status(200).json(clicks)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async getClicksPerMonthInYear(req: Request, res: Response): Promise<any> {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]



    const year = parseInt(req.params.year, 10)
    const businessId = req.params.businessId
    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId })
    const { _id: analyticsId } = analyticsres[0]


    if (!year || isNaN(year)) {
      res.status(400).json({ error: 'Invalid year provided' })
      return
    }

    try {
      const monthlyData = []

      for (let month = 1; month <= 12; month++) {
        const startDate = new Date(`${year}-${month < 10 ? '0' : ''}${month}-01T00:00:00.000Z`)
        const endMonth = month < 12 ? month + 1 : 1
        const endYear = month < 12 ? year : year + 1
        const endDate = new Date(
          `${endYear}-${endMonth < 10 ? '0' : ''}${endMonth}-01T00:00:00.000Z`
        )

        const clicks = await MongoDBClick.find({
          analyticsId: analyticsId,
          dateclicked: {
            $gte: startDate,
            $lt: endDate
          }
        }).exec()

        monthlyData.push({
          label: monthNames[month - 1],
          click: clicks.length
        })
      }

      res.status(200).json(monthlyData)
      return monthlyData
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async getClicksByIdInYear(req: Request, res: Response): Promise<any> {

    const year = req.params.year
    const businessId = req.params.businessId
    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId })
    const { _id: analyticsId } = analyticsres[0]

    try {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`)
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`)

      const clicks = await MongoDBClick.find({
        analyticsId: analyticsId,
        dateclicked: {
          $gte: startDate,
          $lte: endDate
        }
      }).exec()

      res.status(200).json(clicks.length)
      return clicks
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async getClicksPerDayInMonth(req: Request, res: Response): Promise<any> {
   
    const year = parseInt(req.params.year, 10)
    const month = parseInt(req.params.month, 10)
    const businessId = req.params.businessId
    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId })
    const { _id: analyticsId } = analyticsres[0]
    
    if (!month || isNaN(month) || !year || isNaN(year)) {
      res.status(400).json({ error: 'Invalid year or month provided' })
      return
    }

    try {
      const dailyData = []
      const getNumDaysInMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate()
      const numDays = getNumDaysInMonth(year, month - 1)

      for (let day = 1; day <= numDays; day++) {
        const formattedMonth = (month < 10 ? '0' : '') + month
        const formattedDay = (day < 10 ? '0' : '') + day
        const startDate = new Date(`${year}-${formattedMonth}-${formattedDay}T00:00:00.000Z`)

        const endDate = new Date(`${year}-${formattedMonth}-${formattedDay}T23:59:59.999Z`)

        const clicks = await MongoDBClick.find({
          analyticsId: analyticsId,
          dateclicked: {
            $gte: startDate,
            $lte: endDate
          }
        }).exec()

        dailyData.push({
          label: `${formattedDay}`,
          click: clicks.length
        })
      }

      res.status(200).json(dailyData)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ClickController
