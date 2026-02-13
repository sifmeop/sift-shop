import { BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { memoryStorage } from 'multer'

const ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

export const createFileInterceptor = (options?: Partial<MulterOptions>) => {
  return FileInterceptor('image', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024
    },
    fileFilter: (_, file, cb) => {
      if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
        return cb(
          new BadRequestException({
            code: 'INVALID_FILE_TYPE',
            message: 'Invalid file type'
          }),
          false
        )
      }

      cb(null, true)
    },
    ...options
  })
}
