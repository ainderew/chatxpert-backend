import { Request, Response, NextFunction} from 'express'

export interface CustomError{
  message: string
  status: number
}

export const ErrorHandler = (err: CustomError , req:Request , res: Response, next:NextFunction) =>{
  res.header("Content-Type", 'application/json')
  return res.status(err.status).json({message:err.message})
}