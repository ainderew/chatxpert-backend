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


    if(customerId !== '0'){
      const ageres = await MongoDBCustomer.find({ customerId: customerId})
      const { age } = ageres[0]
      newClick.setCustomerAge(age)
    }
    else{
      newClick.setCustomerAge(0)
    }

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

/*   public async getClicksPerMonthInYear(req: Request, res: Response): Promise<any> {
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
    console.log("mark ", businessId)
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
  } */
  public async getClicksPerMonth(req: Request, res: Response): Promise<any> {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
  
    const year = parseInt(req.params.year, 10);
    const businessId = req.params.businessId;
  
    if (!year || isNaN(year)) {
      res.status(400).json({ error: 'Invalid year provided' });
      return;
    }
  
    try {
      const analyticsres = await MongoDBCAnalytics.findOne({ businessId });
      if (!analyticsres) {
        res.status(404).json({ error: 'Business not found' });
        return;
      }
  
      const analyticsId = analyticsres._id;
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);
  
      const aggregationPipeline = [
        {
          $match: {
            analyticsId: analyticsId,
            dateclicked: {
              $gte: startDate,
              $lt: endDate
            }
          }
        },
        {
          $group: {
            _id: { $month: '$dateclicked' },
            count: { $sum: 1 }
          }
        }
      ];
  
      const monthlyData = await MongoDBClick.aggregate(aggregationPipeline).exec();
  
      const clicks = monthNames.map((month, index) => {
        const monthlyCount = monthlyData.find(item => item._id === index + 1);
        return monthlyCount ? monthlyCount.count : 0;
      });
  
      const labels = monthNames;
  
      res.status(200).json({ clicks, labels });
      return { clicks, labels };
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

  public async getClicksPerDay(req: Request, res: Response): Promise<any> {
    const year = parseInt(req.params.year, 10);
    const month = parseInt(req.params.month, 10);
    const businessId = req.params.businessId;
    const analyticsres = await MongoDBCAnalytics.find({ businessId: businessId });
  
    if (!month || isNaN(month) || !year || isNaN(year) || analyticsres.length === 0) {
      res.status(400).json({ error: 'Invalid year, month, or businessId provided' });
      return;
    }
  
    const { _id: analyticsId } = analyticsres[0];
  
    try {
      const startDate = new Date(year, month - 1, 1, 0, 0, 0);
      const endDate = new Date(year, month, 0, 23, 59, 59);
  
      const aggregationPipeline = [
        {
          $match: {
            analyticsId,
            dateclicked: {
              $gte: startDate,
              $lte: endDate
            },
           
          }
        },
        {
          $group: {
            _id: { $dayOfMonth: '$dateclicked' },
            count: { $sum: 1 },
            unknown: { $sum: { $cond: [{ $and: [{$gte: ["$customerAge", 0]}, {$lte: ["$customerAge", 11]}]}, 1, 0] } },
            teen: { $sum: { $cond: [{ $and: [{$gte: ["$customerAge", 12]}, {$lte: ["$customerAge", 18]}]}, 1, 0] } },
            youngAdult: { $sum: { $cond: [{ $and: [{$gte: ["$customerAge", 19]}, {$lte: ["$customerAge", 26]}]}, 1, 0] } },
            adult: { $sum: { $cond: [{ $and: [{$gte: ["$customerAge", 27]}, {$lte: ["$customerAge", 60]}]}, 1, 0] } },
            senior: { $sum: { $cond: [{ $and: [{$gte: ["$customerAge", 47]}, {$lte: ["$customerAge", 1000]}]}, 1, 0] } },
          }
        }
      ];
  
      const dailyData = await MongoDBClick.aggregate(aggregationPipeline).exec();
  
      const numDays = new Date(year, month, 0).getDate();
      const clicks = new Array(numDays).fill(0);
      const labels = Array.from({ length: numDays }, (_, i) => (i + 1).toString());
      const ageCounts = { unknown: 0, teen: 0, youngAdult: 0, adult: 0,  seniors: 0 }; // Initialize age count object
  
      dailyData.forEach((data) => {
        const day = data._id - 1;
        clicks[day] = data.count;
        ageCounts.unknown+= data.unknown;
        ageCounts.teen += data.teen;
        ageCounts.youngAdult += data.youngAdult;
        ageCounts.adult += data.adult;
        ageCounts.seniors += data.senior;
      });

      res.status(200).json({ clicks, labels, ageCounts });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
}

export default ClickController
