import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Product } from '@sift-shop/database'
import Decimal from 'decimal.js'

@ObjectType()
export class SearchEntity implements Partial<Product> {
  @Field(() => ID)
  id: string

  @Field()
  slug: string

  @Field()
  name: string

  @Field(() => Float)
  price: Decimal

  @Field(() => Int, { nullable: true })
  discountPercent: number | null

  @Field(() => Int)
  stock: number

  @Field(() => [String])
  images: string[]
}
