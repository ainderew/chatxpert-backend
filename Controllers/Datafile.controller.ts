import { Request, Response } from 'express'
import Datafile, { MongoDBDatafile } from '../Models/Datafile.model'
import axios from 'axios'

class DatafileController {
  public async saveUploadData(req: Request, res: Response) {
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

      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async fileDownload(req: Request, res: Response) {
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
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async setActive(req: Request, res: Response) {
    const datafileId = req.params.datafileId
    const { businessId } = req.body
    const dateNow = new Date()
    try {
      await MongoDBDatafile.updateMany({ businessId: businessId }, { $set: { status: false } })

      await MongoDBDatafile.updateOne(
        { _id: datafileId },
        { $set: { status: true, datelastused: dateNow } }
      )
      res.status(200).json({ message: 'Updated' })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async findActive(req: Request, res: Response) {
    const businessId = req.params.businessId
    try {
      const findActiveFile = await MongoDBDatafile.findOne({ status: true, businessId })
      res.status(200).json(findActiveFile)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async getAllFiles(req: Request, res: Response) {
    const businessId = req.params.businessId
    try {
      const businessFiles = await MongoDBDatafile.find({ businessId }).select('-blobname -path')
      res.status(200).json(businessFiles)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default DatafileController
