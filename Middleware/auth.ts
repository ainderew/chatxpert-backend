import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res:Response, next: NextFunction) => {
  const {accountId} = req.body

  if(!accountId)next({message:"Not Authenticated", status:403})
  next()
}