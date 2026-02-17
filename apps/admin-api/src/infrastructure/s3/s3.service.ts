import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'

import { optimizationImage } from '~/common/utils/optimizationImage'

@Injectable()
export class S3Service {
  private s3: S3Client
  private bucket: string
  private cloudfrontUrl: string
  private region: string

  constructor(private readonly config: ConfigService) {
    const region = this.config.getOrThrow<string>('AWS_REGION')

    this.s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow<string>('AWS_SECRET_ACCESS_KEY')
      }
    })

    this.region = region
    this.bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET')
    this.cloudfrontUrl = this.config.getOrThrow<string>('CLOUDFRONT_URL')
  }

  async uploadFile(
    file: Buffer<ArrayBufferLike>,
    folder: string
  ): Promise<string> {
    const key = `images/${folder}/${uuidv4()}.webp`

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: 'image/webp'
    })

    await this.s3.send(command)

    return '/' + key
  }

  async updateFile(key: string, file: Express.MulterFile): Promise<string> {
    void this.deleteFile(key)

    const optimizedBuffer = await optimizationImage(file)

    return await this.uploadFile(optimizedBuffer, 'subcategory')
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key
      })
    )
  }

  getImageUrl(key: string) {
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`
  }
}
