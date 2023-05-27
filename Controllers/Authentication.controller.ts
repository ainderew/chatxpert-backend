import { generateAuthToken } from "../Middleware/authentication";
import Channel from "../Models/Channel.model";

class AuthenticationController{
  private model: any;

  constructor(model: any){
    this.model = model
  }


  public loginUser = async(req: any,res:any):Promise<void> => {
    //get from view
    const { email, password} = req.body;

    //instance of customer model
    this.model.setEmail(email)
    this.model.setPassword(password);
    const dbCustomer = await this.model.readCustomer();
    
    const token = generateAuthToken(dbCustomer._id)

    if(dbCustomer){
      return res.send({profile: dbCustomer, token: token})
    }else{
      return res.send({profile: 'no user found'})
    }

  }

  public getRegisterData = async(req: any,res:any):Promise<void> => {
    //Get email and password from view
    const { email, password} = req.body;

    this.model.setEmail(email)
    this.model.setPassword(password)
    await this.model.createCustomer();

    const channelModel = new Channel();

    channelModel.setAccountId(this.model.getCustomerId())
    await channelModel.createChannel();

    res.send({response: {
      userId: this.model.getCustomerId(),
      channelId: channelModel.getChannelId()
    }})
  }

}

export default AuthenticationController