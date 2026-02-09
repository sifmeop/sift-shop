import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    // дефолты
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let code = 'INTERNAL_SERVER_ERROR'
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()

      const response = exception.getResponse()

      if (typeof response === 'string') {
        message = response
      }

      if (typeof response === 'object' && response !== null) {
        const responseObj = response as Record<string, unknown>
        code = (responseObj.code as string) ?? code
        message = (responseObj.message as string) ?? message
      }
    }

    res.status(status).json({
      statusCode: status,
      code,
      message
    })
  }
}
