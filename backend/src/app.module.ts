import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { join } from 'path'

import { GraphQLContext } from './common/types/graphql-context'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { MailModule } from './common/libs/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }: GraphQLContext) => ({ req, res })
    }),
    PassportModule,
    PrismaModule,
    AuthModule,
    UserModule,
    MailModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
