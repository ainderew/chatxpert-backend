import { BlobServiceClient } from '@azure/storage-blob'
import dotenv from 'dotenv'
dotenv.config()

const connStr = process.env.AZURE_CONN_STRING!

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)

export const storageName = process.env.STORAGE_NAME!

export const containerName = process.env.CONTAINER_NAME!

const containerClient = blobServiceClient.getContainerClient(containerName)

export default containerClient
