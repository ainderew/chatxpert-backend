class Message{
  private messageId: string;
  private channelId: string;
  private timecreated: Date;
  private content: string;
  private type: boolean;


  constructor(){
    this.messageId = '';
    this.channelId = '';
    this.timecreated = new Date();
    this.content = '';
    this.type = false;
  }


  public setContent(messageContent: string):void{
    this.content = messageContent;
  }


  public setTimecreated(date: Date):void{
    this.timecreated = date;
  }


  public setType(messageContent: string):void{
    this.content = messageContent;
  }

  public getContent():string{
    return this.content;
  }


  public saveMessage(): void{
    // save to db
  }



}

export default Message;