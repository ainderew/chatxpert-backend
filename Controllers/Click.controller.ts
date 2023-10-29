import { Request, Response } from 'express'
import Click, { MongoDBClick } from '../Models/Click.model'
import Analytics, { MongoDBCAnalytics } from '../Models/Analytics.model'
import { MongoDBCustomer } from '../Models/Customer.model'

class ClickController {
  public async createClick(req: Request, res: Response): Promise<any> {
    const newClick = new Click()
    const date = new Date()
    const businessId = req.params.businessId
    const customerId = req.params.customerId

    if (customerId !== '0') {
      const ageres = await MongoDBCustomer.find({ customerId: customerId })
      const { age } = ageres[0]
      newClick.setCustomerAge(age)
    } else {
      newClick.setCustomerAge(0)
    }

    const analyticsres = await MongoDBCAnalytics.find({
      businessId: businessId,
    })
    const { _id: analyticsId } = analyticsres[0]
    newClick.setAnalyticsId(analyticsId + '' || '')
    newClick.setDateclicked(date)

    try {
      const result = new MongoDBClick(newClick)
      await result.save()
      await MongoDBCAnalytics.updateOne(
        { _id: analyticsId },
        { $inc: { clickCounts: 1 } },
      )
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Bad Request' })
    }
  }

  public async getClicks(req: Request, res: Response): Promise<any> {
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
      'December',
    ]

    const year = parseInt(req.params.year, 10)
    const businessId = req.params.businessId

    try {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`)
      const endDate = new Date(`${year}-12-31T23:59:59.999Z`)

      const analyticsres = await MongoDBCAnalytics.find({
        businessId: businessId,
      })
      const { _id: analyticsId } = analyticsres[0]

      const monthlyData = await MongoDBClick.aggregate([
        {
          $match: {
            analyticsId: analyticsId,
            dateclicked: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $group: {
            _id: { $month: '$dateclicked' },
            count: { $sum: 1 },
          },
        },
      ])

      const monthlyCounts = new Array(12).fill(0)
      monthlyData.forEach((data) => {
        const index = data._id - 1
        monthlyCounts[index] = data.count
      })
      const thisyearClicks = monthlyCounts.reduce(
        (acc, count) => acc + count,
        0,
      )
      const clicks = await Promise.all(
        monthNames.map(async (month, index) => {
          const monthStart = new Date(year, index, 1, 0, 0, 0)
          const monthEnd = new Date(year, index + 1, 0, 23, 59, 59)

          const dailyData = await MongoDBClick.aggregate([
            {
              $match: {
                analyticsId,
                dateclicked: {
                  $gte: monthStart,
                  $lte: monthEnd,
                },
              },
            },
            {
              $group: {
                _id: { $dayOfMonth: '$dateclicked' },
                count: { $sum: 1 },
                unknown: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$customerAge', 0] },
                          { $lte: ['$customerAge', 11] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
                teen: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$customerAge', 12] },
                          { $lte: ['$customerAge', 18] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
                youngAdult: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$customerAge', 19] },
                          { $lte: ['$customerAge', 26] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
                adult: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$customerAge', 27] },
                          { $lte: ['$customerAge', 60] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
                senior: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$customerAge', 61] },
                          { $lte: ['$customerAge', 100] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ])

          const numDays = new Date(year, index + 1, 0).getDate()
          const dailyCounts = new Array(numDays).fill(0)
          const ageCounts = {
            unknown: 0,
            teen: 0,
            youngAdult: 0,
            adult: 0,
            senior: 0,
          }
          dailyData.forEach((data) => {
            const day = data._id - 1
            dailyCounts[day] = data.count
            ageCounts.unknown += data.unknown
            ageCounts.teen += data.teen
            ageCounts.youngAdult += data.youngAdult
            ageCounts.adult += data.adult
            ageCounts.senior += data.senior
          })

          return {
            month: month,
            thisMonth: {
              total: monthlyCounts[index],
              ageDemographic: Object.values(ageCounts), // Convert the ageCounts object to an array
              daily: dailyCounts,
            },
          }
        }),
      )

      res.status(200).json({ thisyearClicks, monthlyCounts, clicks })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default ClickController
