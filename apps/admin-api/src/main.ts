import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import parse from 'parse-duration'
import { createClient } from 'redis'

import { AppModule } from './app.module'
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter'
import { parseBoolean } from './common/utils/parse-boolean'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)

  const redis = createClient({
    url: config.getOrThrow<string>('REDIS_URL')
  })

  await redis.connect()

  app.enableCors({
    origin: config.getOrThrow<string>('ORIGIN'),
    credentials: true,
    exposedHeaders: ['Set-Cookie']
  })

  app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')))

  app.use(
    session({
      secret: config.getOrThrow('SESSION_SECRET'),
      name: config.getOrThrow('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow('SESSION_DOMAIN'),
        maxAge: parse(config.getOrThrow('SESSION_MAX_AGE'))!,
        httpOnly: parseBoolean(config.getOrThrow('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow('SESSION_SECURE')),
        sameSite: 'lax'
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow('SESSION_FOLDER')
      })
    })
  )

  app.setGlobalPrefix('api/admin')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  app.useGlobalFilters(new GlobalHttpExceptionFilter())

  const port = config.getOrThrow<number>('PORT')
  await app.listen(port)

  Logger.log(`Application is running on: ${port}`, 'Bootstrap')
}

void bootstrap()
