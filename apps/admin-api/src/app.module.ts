import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './app.controller'
import { AuthGuard } from './common/guards/auth.guard'
import { S3Module } from './infrastructure/s3/s3.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { CustomerModule } from './modules/customer/customer.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'
import { FilterModule } from './modules/filter/filter.module'
import { OrderModule } from './modules/order/order.module'
import { ProductModule } from './modules/product/product.module'
import { ReviewModule } from './modules/review/review.module'
import { SubcategoryModule } from './modules/subcategory/subcategory.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DashboardModule,
    CustomerModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    S3Module,
    FilterModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
