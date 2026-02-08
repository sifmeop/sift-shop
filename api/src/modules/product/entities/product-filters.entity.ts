import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Filter, FilterType } from '~/generated/prisma/client'

import { FilterOptionEntity } from './filter-option.entity'

registerEnumType(FilterType, {
  name: 'FilterType',
  description: 'Filter type'
})

@ObjectType()
export class ProductFiltersEntity implements Partial<Filter> {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  value: string

  @Field(() => FilterType)
  type: FilterType

  @Field(() => [FilterOptionEntity])
  options: FilterOptionEntity[]
}
