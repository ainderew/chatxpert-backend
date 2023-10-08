import { NextFunction } from "express";
import { generateAuthToken } from "../Middleware/authentication";
import Channel from "../Models/Channel.model";
import { MongoDBUser } from "../Models/User.model";
import bcrypt from "bcrypt"
import { Response, Request } from "express";

class AuthenticationController {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  public loginUser = async(req: Request,res: Response, next:NextFunction):Promise<void> => {
    const { email, password} = req.body;
    
    try{
      const result = await MongoDBUser.findOne({ email: email })
      if (!result) return next({message:"Invalid Credentials", status:409})

      const {_id: userid, password:userpassword} = result

      const checkPassword = await bcrypt.compare(password, userpassword)
      if (!checkPassword) return next({message:"Invalid Credentials", status:409})

      const token = generateAuthToken(userid.toString())

      if(result){
        res.send({profile: result, authToken: token})
      }
    }catch(error){
      return next({message:"Invalid Credentials", status:409})
    }
  };

  public getRegisterData = async (req: any, res: any): Promise<void> => {
    //Get email and password from view
    const { email, password } = req.body;

    this.model.setEmail(email);
    this.model.setPassword(password);
    await this.model.createCustomer();

    const channelModel = new Channel();

    channelModel.setAccountId(this.model.getCustomerId());
    await channelModel.createChannel();

    res.send({
      response: {
        userId: this.model.getCustomerId(),
        channelId: channelModel.getChannelId(),
      },
    });
  };

  public getProfile = async (req: any, res: any): Promise<void> => {
    const { userId } = req.body;
    const account = await MongoDBUser.findOne(
      { _id: userId },
      { email: 1, _id: 1, type: 1 }
    ).lean();

    if (!account) {
      res.status(404).json("User not found");
    }
  
    res.send({
      profile: account ,
    });
  };
}

export default AuthenticationController;
