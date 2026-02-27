import { Field, ObjectType } from '@nestjs/graphql'

import { ProductFiltersEntity } from './product-filters.entity'
import { ProductEntity } from './product.entity'

@ObjectType()
export class ProductResponseEntity {
  @Field(() => [ProductEntity])
  products: ProductEntity[]

  @Field(() => [ProductFiltersEntity])
  filters: ProductFiltersEntity[]
}
