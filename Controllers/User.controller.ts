import { Request, Response } from 'express'
import User, { MongoDBUser } from '../Models/User.model'
import bcrypt from 'bcrypt'

class UserController {
  public async createNewUser(req: Request, res: Response): Promise<any> {
    const newUser = new User()
    const { email, password, type } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    newUser.setEmail(email)
    newUser.setPassword(hashPassword)
    newUser.setType(type)

    try {
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
