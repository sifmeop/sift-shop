import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import parse from 'parse-duration'
import { createClient } from 'redis'

import { AppModule } from './app.module'
import { isDev } from './common/utils/is-dev'
import { parseBoolean } from './common/utils/parse-boolean'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true
  })

  app.set('trust proxy', 1)

  const config = app.get(ConfigService)

  const redis = createClient({
    url: config.getOrThrow<string>('REDIS_URL')
  })

  await redis.connect()

  app.enableCors({
    origin: config.getOrThrow<string>('ORIGIN'),
    credentials: true,
    exposedHeaders: isDev(config) ? ['Set-Cookie'] : []
  })

  app.use(cookieParser(config.getOrThrow('COOKIE_SECRET')))

  const domain = config.get<string | undefined>('SESSION_DOMAIN')

  app.use(
    session({
      secret: config.getOrThrow('SESSION_SECRET'),
      name: config.getOrThrow('SESSION_NAME'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        ...(domain ? { domain } : {}),
        maxAge: parse(config.getOrThrow('SESSION_MAX_AGE'))!,
        httpOnly: parseBoolean(config.getOrThrow('SESSION_HTTP_ONLY')),
        secure: parseBoolean(config.getOrThrow('SESSION_SECURE')),
        sameSite: config.getOrThrow('SESSION_SAME_SITE')
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow('SESSION_FOLDER')
      })
    })
  )

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  const port = config.getOrThrow<number>('PORT')
  await app.listen(port)

  Logger.log(`Application is running on: ${port}`, 'Bootstrap')
}

void bootstrap()
