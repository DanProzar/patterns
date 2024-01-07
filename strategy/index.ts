import { writeFile } from "fs/promises"
import * as path from "path"

interface UploadResult {
  success: boolean
  message: string
}

interface UploadStrategy {
  upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult>
}

class LocalUpload implements UploadStrategy {

  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const result: UploadResult = {
        success: true,
        message: "Uploaded to local storage",
      }

      writeFile(path.join(__dirname, filePath, name), content)
        .then(() => {
          resolve(result)
        })
        .catch((e) => {
          result.success = false
          result.message = "Error uploading to local storage"
          reject(result)
        })
    })
  }
}

class CloudUpload implements UploadStrategy {
  public upload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const result: UploadResult = {
        success: true,
        message: "Uploaded to cloud storage",
      }

      setTimeout(() => {
        resolve(result)
      }, 1000)
    })
  }
}

class Context {
  private strategy: UploadStrategy

  constructor(strategy: UploadStrategy) {
    this.strategy = strategy
  }

  public setStrategy(strategy: UploadStrategy) {
    this.strategy = strategy
  }

  public fileUpload(
    filePath: string,
    name: string,
    content: string
  ): Promise<UploadResult> {
    return this.strategy.upload(filePath, name, content)
  }
}


const localUpload = new LocalUpload()
const cloudUpload = new CloudUpload()

const context = new Context(localUpload)

context
  .fileUpload("/", "Output.txt", "Some content")
  .then((result) => {
    console.log(result)
  })
