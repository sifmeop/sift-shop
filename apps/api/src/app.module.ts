import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-scalars'
import { join } from 'path'

import { AuthGuard } from './common/guards/auth.guard'
import { MailModule } from './common/libs/mail/mail.module'
import { PusherModule } from './common/libs/pusher'
import { StripeModule } from './common/libs/stripe/stripe.module'
import { GraphQLContext } from './common/types/graphql-context'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/cart/cart.module'
import { CategoryModule } from './modules/category/category.module'
import { NotificationModule } from './modules/notification/notification.module'
import { OrderModule } from './modules/order/order.module'
import { ProductModule } from './modules/product/product.module'
import { UserModule } from './modules/user/user.module'
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { TwoFactorAuthModule } from './modules/two-factor-auth/two-factor-auth.module';

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
    ScheduleModule.forRoot(),
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
    ProductModule,
    CartModule,
    OrderModule,
    StripeModule,
    NotificationModule,
    PusherModule,
    WishlistModule,
    TwoFactorAuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
