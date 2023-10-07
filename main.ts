import config from './config'
import Database from './Models/DB.helper'
import bodyParser from 'body-parser'
import cors from 'cors'
import ChatController from './Controllers/Chat.controller'
import Message from './Models/Message.model'
import AuthenticationController from './Controllers/Authentication.controller'
import route from './routes/route'
import User from './Models/User.model'
import { ErrorHandler } from './Middleware/error'
const express = require('express')

const app = express()

const db = new Database(config.DB_URL)
db.connectToDB()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req: any, res: any) => {
  res.send('BRAMK coming soon')
})
// const mCustomer = new Customer()
const mUser = new User()
const cMessage = new Message('')
// const cController = new CustomerController(mCustomer);
const chController = new ChatController(cMessage)
// const cAuthentication = new AuthenticationController(mCustomer)
const cAuthentication = new AuthenticationController(mUser)

//register customer is also created in the routes file, check which is better
//I am not confident in changing anything here
app.use('/register/customer', cAuthentication.getRegisterData)
app.use('/login', cAuthentication.loginUser)
app.use('/getReply', chController.getReply)
app.use(route)
app.use(ErrorHandler)

app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT} 🚀🥳`)
})
