import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Product } from '@sift-shop/database'

@ObjectType()
export class CartProductItemEntity implements Partial<Product> {
  @Field()
  id: string

  @Field()
  slug: string

  @Field()
  name: string

  @Field(() => Int)
  stock: number

  @Field(() => [String])
  images: string[]
}
