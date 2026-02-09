import { Field, Float, ObjectType } from '@nestjs/graphql'
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

  @Field(() => Boolean)
  inStock: boolean

  @Field(() => Boolean)
  isFeatured: boolean

  @Field()
  thumbnail: string

  @Field(() => [String])
  images: string[]

  @Field(() => GraphQLJSON)
  filterValues: Prisma.JsonValue

  @Field(() => GraphQLJSON)
  specifications: Prisma.JsonValue

  // @Field(() => [ProductVariantEntity])
  // variants: ProductVariant[]
}
