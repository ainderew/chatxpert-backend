import express from 'express'
import CustomerController from '../Controllers/Customer.controller'
import BusinessController from '../Controllers/Business.controller'
import DatafileController from '../Controllers/Datafile.controller'
import ClickController from '../Controllers/Click.controller'
import AnalyticsController from '../Controllers/Analytics.controller'

const route = express()
const customer = new CustomerController()
const business = new BusinessController()
const datafile = new DatafileController()
const click = new ClickController()
const analytics = new AnalyticsController()

route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/register/customer', customer.registerCustomer)
route.post('/api/register/business', business.registerBusiness)
route.post('/api/file/fileupload', datafile.saveUploadData)
route.get('/api/file/getallfiles/:businessId', datafile.getAllFiles)
route.get('/api/file/download/:datafileId', datafile.fileDownload)
route.post('/api/file/trigger/:datafileId', datafile.setActive)
route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/clicked/:businessId/:customerId', click.createClick)
route.get('/api/clicks/:businessId', click.getClicksById)
route.get('/api/clicks/:businessId/:year', click.getClicksByIdInYear)
route.get('/api/yearlyclicks/:businessId/:year', click.getClicksPerMonthInYear)
route.get('/api/monthlyclicks/:businessId/:year/:month', click.getClicksPerDayInMonth)

//route.get('/api/yearclicks/bymonth/:analyticsId/:year', click.getClicksByMonthInYear)
export default route

