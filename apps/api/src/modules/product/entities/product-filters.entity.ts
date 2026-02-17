import { Field, ObjectType } from '@nestjs/graphql'
import { Filter } from '@sift-shop/database'

import { FilterOptionEntity } from './filter-option.entity'

@ObjectType()
export class ProductFiltersEntity implements Partial<Filter> {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  slug: string

  @Field(() => [FilterOptionEntity])
  options: FilterOptionEntity[]
}
