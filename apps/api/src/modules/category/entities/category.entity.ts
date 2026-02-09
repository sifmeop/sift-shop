import { Field, ObjectType } from '@nestjs/graphql'
import { Category } from '@sift-shop/database'

import { SubcategoryEntity } from './subcategory.entity'

@ObjectType()
export class CategoryEntity implements Partial<Category> {
  @Field()
  slug: string

  @Field()
  name: string

  @Field(() => [SubcategoryEntity])
  subcategories: SubcategoryEntity[]
}
