import { NextFunction, Request, Response } from 'express'
import Datafile, { MongoDBDatafile } from '../Models/Datafile.model'
import axios from 'axios'
import config from '../config'

class DatafileController {
  public async saveUploadData( req: Request, res: Response, next: NextFunction) {
    try {
      const dataFile = new Datafile()
      const { businessId, originalname, blobname, path } = req.body
      const dateuploaded = new Date()
      const datelastused = new Date()

      await MongoDBDatafile.updateMany({ businessId: businessId }, { $set: { status: false } })

      dataFile.setBusinessId(businessId)
      dataFile.setOriginalname(originalname)
      dataFile.setBlobname(blobname)
      dataFile.setPath(path)
      dataFile.setStatus(true)
      dataFile.setDateuploaded(dateuploaded)
      dataFile.setDatelastused(datelastused)

      const result = new MongoDBDatafile(dataFile)
      await result.save()

      const url = `${config.BRAMK_AI_ENDPOINT}/newfile`;
      console.log(url)
      try {
        await axios.post(url, {
          data: blobname
        })
      } catch (error) {
        res.status(500).send('An error occurred')
      }

      res.status(200).json(result)
    } catch (error) {
      next({message: "File upload failed. Try again later.", status:500 })
    }
  }

  public async fileDownload(req: Request, res: Response, next:NextFunction) {
    const datafileId = req.params.datafileId

    try {
      const result = await MongoDBDatafile.find({ _id: datafileId })

      const { originalname, path } = result[0]

      const fileUrl = path || ''

      const response = await axios.get(fileUrl, { responseType: 'stream' })

      res.setHeader('Content-Disposition', `attachment; filename=${originalname || ''}`)
      res.setHeader('Content-Type', 'text/plain')

      response.data.pipe(res)
    } catch (error) {
      next({message: "Fil could not be downloaded. Try again later.", status:500 })
    }
  }

  public async setActive(req: Request, res: Response, next:NextFunction) {
    const datafileId = req.params.datafileId
    const { businessId } = req.body
    const dateNow = new Date()
    try {
      await MongoDBDatafile.updateOne({ businessId: businessId , status: true}, { $set: { datelastused: dateNow } }) 

      await MongoDBDatafile.updateMany({ businessId: businessId }, { $set: { status: false } }) 

      await MongoDBDatafile.updateOne(
        { _id: datafileId },
        { $set: { status: true } }
      )
      res.status(200).json({datelastused: dateNow})
    } catch (error) {
      next({message: "File activation failed. Try again later.", status:500 })
    }
  }

  public async findActive(req: Request, res: Response, next:NextFunction) {
    const businessId = req.params.businessId
    try {
      const findActiveFile = await MongoDBDatafile.findOne({ status: true, businessId })
      res.status(200).json(findActiveFile)
    } catch (error) {
      next({message: "Cannot find active file. Try again later.", status:500 })
    }
  }

  public async getAllFiles(req: Request, res: Response, next:NextFunction) {
    const businessId = req.params.businessId
    try {

      const businessFiles = await MongoDBDatafile.find({ businessId }).select('-blobname -path')

      res.status(200).json(businessFiles)
    } catch (error) {
      next({message:  "The files you're looking for are currently unavailable. Retry later.", status:500 })
    }
  }
}

export default DatafileController
