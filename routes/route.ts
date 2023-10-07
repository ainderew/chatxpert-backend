import express from 'express'
import CustomerController from '../Controllers/Customer.controller'
import BusinessController from '../Controllers/Business.controller'
import DatafileController from '../Controllers/Datafile.controller'
import ClickController from '../Controllers/Click.controller'
import AnalyticsController from '../Controllers/Analytics.controller'
import { isAuth } from '../Middleware/auth'
import AuthenticationController from '../Controllers/Authentication.controller'
import { authenticate } from '../Middleware/authentication'
import User from '../Models/User.model'

const route = express()
const mUser = new User()

const customer = new CustomerController()
const business = new BusinessController()
const datafile = new DatafileController()
const click = new ClickController()
const analytics = new AnalyticsController()
const auth = new AuthenticationController(mUser)

route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/register/customer', customer.registerCustomer)
route.post('/api/register/business', business.registerBusiness)
route.post('/api/file/fileupload', isAuth , datafile.saveUploadData)
route.get('/api/file/getallfiles/:businessId', datafile.getAllFiles)
route.get('/api/file/download/:datafileId', datafile.fileDownload)
route.post('/api/file/trigger/:datafileId', datafile.setActive)
route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/clicked/:businessId/:customerId', click.createClick)
route.get('/api/clicks/:businessId', click.getClicksById)
route.get('/api/clicks/:businessId/:year', click.getClicksByIdInYear)
route.get('/api/yearlyclicks/:businessId/:year', click.getClicksPerMonthInYear)
route.get('/api/monthlyclicks/:businessId/:year/:month', click.getClicksPerDayInMonth)
route.get('/getProfile',authenticate, auth.getProfile)

//route.get('/api/yearclicks/bymonth/:analyticsId/:year', click.getClicksByMonthInYear)
export default route

