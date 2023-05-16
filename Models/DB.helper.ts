import mongoose from "mongoose";

class Database{
  private connectionURL: string;


  constructor(connURL: string){
    this.connectionURL = connURL;
  }


  public connectToDB = (): void =>{
      mongoose.connect(this.connectionURL, {}).then(() =>{
      try{
        console.log("Connected to Database")
      }catch(err){
        console.log(err)
        throw(err);
      }
    })
  }

}

export default Database;