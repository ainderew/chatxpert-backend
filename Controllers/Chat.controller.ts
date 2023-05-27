import axios from 'axios'
import Message from '../Models/Message.model';
import Channel from '../Models/Channel.model';
import AnalyticsModel from '../Models/Analytics.model';
import { SEARCH_TERMS } from '../utils/constants';

class ChatController {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  public async getReply (req: any, res: any):Promise<void> {
    const {userInput, userId} = req.body


   const setAnalytics = (messageId:string, businessId:string = "") =>{
    const searchTerm = getSearchTerm(userInput)
    
    searchTerm.forEach(term =>{
      const analyticData = new AnalyticsModel();
      analyticData.setMessageId(messageId)
      analyticData.setBusinessId(businessId)
      analyticData.setSearchTerm(term)
      analyticData.saveAnalyticsData()
    })
   }

    if(!userId || userId === ''){
      const userMessage = new Message(userInput[userInput.length - 1].content);
      userMessage.setType(false);
      userMessage.saveMessage();
      setAnalytics(userMessage.getMessageId())
    }else{
      const channel = new Channel();
      const userChannelId = await channel.getUserChannel(userId)
  
      const userMessage = new Message( userInput[userInput.length - 1].content);
      userMessage.setChannelId(userChannelId)
      userMessage.setType(false)
      userMessage.saveMessage();
      setAnalytics(userMessage.getMessageId())
    }

    try {
      const response = await axios.post('http://localhost:2121/',{
        data: userInput
      });
      console.log(response.data)
      const aiMessage = new Message(response.data)
      aiMessage.setType(true);
      aiMessage.saveMessage();
  
      res.send({content: response.data, role: 'ai'});
    } catch (error) {
      // Handle error
      console.log(error);
      res.status(500).send('An error occurred');
    }

  }
}


const getSearchTerm = (userInput: any) : string[] =>{
  const lastInput = userInput[userInput.length - 1].content

  const result = SEARCH_TERMS.filter(term => lastInput.toLowerCase().includes(term));
  console.log(result)
  return result;
}

export default ChatController