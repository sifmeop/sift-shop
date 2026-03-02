import { Field, ObjectType } from '@nestjs/graphql'

import { ProductEntity } from './product.entity'

@ObjectType()
export class HomeProductsEntity {
  @Field(() => [ProductEntity])
  bestSelling: ProductEntity[]

  @Field(() => [ProductEntity])
  featured: ProductEntity[]
}
