import express from 'express'
import multer from 'multer'
import CustomerController from '../Controllers/Customer.controller'
import BusinessController from '../Controllers/Business.controller'
import DatafileController from '../Controllers/Datafile.controller'
import ClickController from '../Controllers/Click.controller'
import AnalyticsController from '../Controllers/Analytics.controller'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const route = express()
const customer = new CustomerController()
const business = new BusinessController()
const datafile = new DatafileController()
const click = new ClickController()
const analytics = new AnalyticsController()

route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/register/customer', customer.registerCustomer)
route.post('/api/register/business', business.registerBusiness)
route.post('/api/file/upload', upload.single('file'), datafile.fileUpload)
route.get('/api/file/getallfiles/:businessId', datafile.getAllFiles)
route.get('/api/file/download/:datafileId', datafile.fileDownload)
route.post('/api/file/trigger/:datafileId', datafile.setActive)
route.post('/api/analytics/:businessId', analytics.createAnalytics)
route.post('/api/clicked/:analyticsId', click.createClick)
route.get('/api/clicks/:analyticsId', click.getClicksById)
route.get('/api/clicks/:analyticsId/:year', click.getClicksByIdInYear)
route.get('/api/yearlyclicks/:analyticsId/:year', click.getClicksPerMonthInYear)
route.get('/api/monthlyclicks/:analyticsId/:year/:month', click.getClicksPerDayInMonth)

//route.get('/api/yearclicks/bymonth/:analyticsId/:year', click.getClicksByMonthInYear)
export default route
