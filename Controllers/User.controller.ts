import { NextFunction, Request, Response } from 'express'
import User, { MongoDBUser } from '../Models/User.model'
import bcrypt from 'bcrypt'

class UserController {
  public async createNewUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const newUser = new User()
    const { email, password, type } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    newUser.setEmail(email)
    newUser.setPassword(hashPassword)
    
    if(type==='business')newUser.setType(true)
    else if(type==='customer')newUser.setType(false)

    try {
      const userCheck = await MongoDBUser.find({email});

      if(userCheck){
        next({message: "User credential already exists", status:409 })
        
      }


      const result = new MongoDBUser(newUser)
      await result.save()
      return result
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Bad Request' })
    }
  }
}

export default UserController
