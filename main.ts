import config from "./config"
import Customer from "./Models/Customer.model";
import Database from "./Models/DB.helper";
import CustomerController from './Controllers/Customer.controller'
import bodyParser from "body-parser";
import cors from 'cors'
import ChatController from "./Controllers/Chat.controller";
import Message from "./Models/Message.model";
const express = require('express');


const app = express();


const db = new Database(config.DB_URL)
db.connectToDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {

  res.send('BRAMK coming soon');

});
const cModel = new Customer()
const cMessage = new Message()
const cController = new CustomerController(cModel);
const chController = new ChatController(cMessage);
console.log(cController.getTest())
app.use('/register/customer',cController.getRegisterData);
app.use('/login',cController.loginUser);
app.use('/getReply',chController.getReply);



app.listen(config.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${config.PORT} 🚀🥳`);


});