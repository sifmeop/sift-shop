import { Field, ObjectType } from '@nestjs/graphql'
import { Product } from '@sift-shop/database'

@ObjectType()
export class OrderItemProductEntity implements Partial<Product> {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => [String])
  images: string[]
}
