import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { ThrottlerModule } from '@nestjs/throttler'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-scalars'
import { join } from 'path'

import { MailModule } from './common/libs/mail/mail.module'
import { GraphQLContext } from './common/types/graphql-context'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/product/product.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req, res }: GraphQLContext) => ({ req, res }),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        scalarsMap: [
          {
            type: () => 'JSON',
            scalar: GraphQLJSON
          },
          {
            type: () => 'JSONObject',
            scalar: GraphQLJSONObject
          }
        ]
      }
    }),
    PassportModule,
    MailModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule
  ],
  controllers: []
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: GqlThrottlerGuard
  //   }
  // ]
})
export class AppModule {}
