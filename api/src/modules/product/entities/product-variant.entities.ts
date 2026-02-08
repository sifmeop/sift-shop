import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

import { Prisma, ProductVariant } from '~/generated/prisma/client'

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
