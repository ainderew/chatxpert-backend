import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import config from "../config";

const AuthenticationSchema = new mongoose.Schema({
  accountId: {type: String},
  token: {type: String},
  expiresAt: {type: Date}
})

const AuthToken = mongoose.model('Authtoken', AuthenticationSchema)

export const authenticate = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
  const {authToken} = req.body;

  if (authToken) {
    try {
      const secretKey = config.SECRET;
      const decodedToken = jwt.verify(authToken, secretKey) as { userId: string, exp: number };

      // Check if the token has expired
      if (Date.now() >= decodedToken.exp * 1000) {
        return res.status(401).json({ message: 'Token expired' });
      }

    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }

  const result = await AuthToken.find({token: authToken})

  if (!result){
    return res.status(401).json({message: 'Invalid token'})
  }

  next();
};


export const generateAuthToken = (userId: string): string => {
  const secretKey = config.SECRET; // Replace with your own secret key
  const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });

  const dbToken = new AuthToken({accountId: userId, token: token})
  dbToken.save()
  return token;
};

