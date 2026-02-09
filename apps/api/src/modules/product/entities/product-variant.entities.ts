import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { Prisma, ProductVariant } from '@sift-shop/database'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class ProductVariantEntity implements Partial<ProductVariant> {
  @Field()
  id: string

  @Field()
  sku: string

  @Field(() => Int)
  stock: number

  @Field(() => Float)
  price: Prisma.Decimal

  @Field(() => Float, { nullable: true })
  compareAtPrice: Prisma.Decimal

  @Field()
  thumbnail: string

  @Field(() => [String])
  images: string[]

  @Field()
  productId: string

  @Field()
  product: string

  @Field(() => GraphQLJSON)
  attributes: Prisma.JsonValue
}
