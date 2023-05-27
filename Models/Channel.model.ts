
import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  accountId: {type: String},
})
const MongoDBChannel = mongoose.model('Channel', ChannelSchema);

class Channel{
  private channelId: string
  private accountId: string


  constructor(){
    this.channelId = ""
    this.accountId = ""
  }


  public setAccountId(accountId: string):void {
    this.accountId = accountId;
  }
  public getAccountId():string {
    return this.accountId
  }

  public getChannelId(){
    return this.channelId;
  }

  public createChannel ():void {
    const channel =  new MongoDBChannel({accountId: this.accountId})
    channel.save();

    this.channelId = channel._id.toString();
  }

  public getUserChannel = async(accountId: string):Promise< string> =>{
    const channel = await MongoDBChannel.findOne({accountId: accountId});
    if(channel)return channel?._id.toString()
    
    return ""
  }
}

export default Channel