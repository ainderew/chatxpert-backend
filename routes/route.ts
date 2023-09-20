import express from 'express'
import multer from 'multer'
import CustomerController from '../Controllers/Customer.controller'
import BusinessController from '../Controllers/Business.controller'
import DatafileController from '../Controllers/Datafile.controller'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const route = express()
const customer = new CustomerController()
const business = new BusinessController()
const datafile = new DatafileController()

route.post('/api/register/customer', customer.registerCustomer)
route.post('/api/register/business', business.registerBusiness)
route.post('/api/file/upload', upload.single('file'), datafile.fileUpload)
route.get('/api/file/getallfiles/:businessId', datafile.getAllFiles)
route.get('/api/file/download/:datafileId', datafile.fileDownload)
route.post('/api/file/trigger/:datafileId', datafile.setActive)

export default route
