import containerClient, { containerName, storageName } from '../utils/azure'
import { Request, Response, NextFunction } from 'express'
import Datafile, { MongoDBDatafile } from '../Models/Datafile.model'

class DatafileController {
  public async fileUpload(req: Request, res: Response, next: NextFunction) {
    try {
      const dataFile = new Datafile()
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
      }

      const { businessId } = req.body
      const dateuploaded = new Date()
      const datelastused = new Date()
      const fileBuffer = req.file.buffer
      const originalname = req.file.originalname
      const blobName = `${Date.now()}-${req.file.originalname}`
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)

      await blockBlobClient.uploadData(fileBuffer)

      await MongoDBDatafile.updateMany({ businessId: businessId }, { $set: { status: false } })

      dataFile.setBusinessId(businessId)
      dataFile.setOriginalname(originalname)
      dataFile.setBlobname(blobName)
      dataFile.setPath(`https://${storageName}.blob.core.windows.net/${containerName}/${blobName}`)
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

  public async fileDownload(req: Request, res: Response, next: NextFunction) {
    const datafileId = req.params.datafileId

    try {
      const result = await MongoDBDatafile.find({ _id: datafileId })

      const { blobname, originalname } = result[0]

      const blockBlobClient = containerClient.getBlobClient(blobname || '')

      const response = await blockBlobClient.download()
      const stream = response.readableStreamBody!

      res.set({
        'Content-Type': response.contentType,
        'Content-Length': response.contentLength,
        'Content-Disposition': `attachment; filename="${originalname || ''}"`
      })

      stream.pipe(res)
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

  //needs changing because ids will be passed using request
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
