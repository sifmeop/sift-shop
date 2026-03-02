import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

import { ProductEntity } from './product.entity'

@ObjectType()
export class CategoryRefEntity {
  @Field()
  slug: string

  @Field()
  name: string
}

@ObjectType()
export class SubcategoryRefEntity {
  @Field()
  slug: string

  @Field()
  name: string
}

@ObjectType()
export class ProductDetailEntity extends ProductEntity {
  @Field(() => CategoryRefEntity)
  declare category: CategoryRefEntity

  @Field(() => SubcategoryRefEntity)
  declare subcategory: SubcategoryRefEntity

  @Field(() => Boolean)
  declare isPurchased: boolean

  @Field(() => Float)
  declare rating: number

  @Field(() => Int)
  declare reviewCount: number
}
