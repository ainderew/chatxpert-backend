import express from "express";
import CustomerController from "../Controllers/Customer.controller";
import BusinessController from "../Controllers/Business.controller";
import DatafileController from "../Controllers/Datafile.controller";
import ClickController from "../Controllers/Click.controller";
import AnalyticsController from "../Controllers/Analytics.controller";
import AuthenticationController from "../Controllers/Authentication.controller";
import { authenticate } from "../Middleware/authentication";
import User from "../Models/User.model";
import NotificationController from "../Controllers/Notification.controller";

const route = express();
const mUser = new User();

const customer = new CustomerController();
const business = new BusinessController();
const datafile = new DatafileController();
const click = new ClickController();
const analytics = new AnalyticsController();
const auth = new AuthenticationController(mUser);
const notification = new NotificationController();

/* route.post('/api/analytics/:businessId', analytics.createAnalytics) */
route.post("/api/register/customer", customer.registerCustomer);
route.post("/api/register/business", business.registerBusiness);
route.post("/api/file/fileupload", authenticate, datafile.saveUploadData);
route.get("/api/file/getallfiles/:businessId", datafile.getAllFiles);
route.get("/api/file/download/:datafileId", datafile.fileDownload);
route.post("/api/file/trigger/:datafileId", datafile.setActive);
route.post("/api/analytics/:businessId", analytics.createAnalytics);
route.post("/api/clicked/:businessId/:customerId", click.createClick);
//route.get('/api/clicks/:businessId', click.getClicksById)
route.get("/api/clicks/:businessId/:year", click.getClicks);
route.get("/getProfile", authenticate, auth.getProfile);
route.get(
  "/api/notification/getnotifications/:businessId",
  notification.findBusinessNotifications
);
route.get(
  "/api/notification/hasnotification/:businessId",
  notification.checkHasView
);
route.post("/api/notification/trigger/", notification.updateIsViewed);
route.get("/test", (req, res) => res.send("HELLo"));
route.get("/api/business/categories/:year", business.categorizeBusiness);
route.get("/api/business/categories/:year", business.categorizeBusiness);
route.get('/api/business/all', business.getAllBusiness)

//route.get('/api/yearclicks/bymonth/:analyticsId/:year', click.getClicksByMonthInYear)
export default route;
