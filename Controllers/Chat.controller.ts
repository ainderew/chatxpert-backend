import axios from 'axios'

class ChatController {
  private model: any;

  constructor(newMod: any) {
    this.model = newMod;
  }

  public async getReply (req: any, res: any):Promise<void> {
    const {searchInput} = req.body
    console.log("HERE") 
    console.log(searchInput)

    try {
      // Send a GET request to another endpoint
      const response = await axios.post('http://localhost:2121/',{
        data: searchInput
      });
  
      // Handle successful response
      console.log({...response.data, type:'ai'});
      res.send({...response.data, type: 'ai'});
    } catch (error) {
      // Handle error
      console.log(error);
      res.status(500).send('An error occurred');
    }

  }
}


export default ChatController