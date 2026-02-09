import { Field, ObjectType } from '@nestjs/graphql'
import { Subcategory } from '@sift-shop/database'

@ObjectType()
export class SubcategoryEntity implements Partial<Subcategory> {
  @Field()
  slug: string

  @Field()
  name: string

  @Field()
  image: string
}
