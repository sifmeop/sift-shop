import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Prisma, Product } from '@sift-shop/database'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class ProductEntity implements Partial<Product> {
  @Field()
  id: string

  @Field()
  slug: string

  @Field()
  name: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => Float)
  price: Prisma.Decimal

  @Field(() => Float, { nullable: true })
  compareAtPrice: Prisma.Decimal | null

  @Field(() => Int)
  stock: number

  @Field(() => Boolean)
  isFeatured: boolean

  @Field(() => [String])
  images: string[]

  @Field(() => GraphQLJSON)
  specifications: Prisma.JsonValue
}
