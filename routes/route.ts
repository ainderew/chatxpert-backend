import express from 'express'
import CustomerController from '../Controllers/Customer.controller'
import BusinessController from '../Controllers/Business.controller'
import DatafileController from '../Controllers/Datafile.controller'
import { isAuth } from '../Middleware/auth'
import AuthenticationController from '../Controllers/Authentication.controller'
import { authenticate } from '../Middleware/authentication'
import User from '../Models/User.model'

const route = express()
const mUser = new User()

const customer = new CustomerController()
const business = new BusinessController()
const datafile = new DatafileController()
const auth = new AuthenticationController(mUser)

route.post('/api/register/customer', customer.registerCustomer)
route.post('/api/register/business', business.registerBusiness)
route.post('/api/file/fileupload', isAuth , datafile.saveUploadData)
route.get('/api/file/getallfiles/:businessId', datafile.getAllFiles)
route.get('/api/file/download/:datafileId', datafile.fileDownload)
route.post('/api/file/trigger/:datafileId', datafile.setActive)
route.get('/getProfile',authenticate, auth.getProfile)

export default route
