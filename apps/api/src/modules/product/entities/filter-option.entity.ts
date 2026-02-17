import { Field, ObjectType } from '@nestjs/graphql'
import { FilterOption } from '@sift-shop/database'

@ObjectType()
export class FilterOptionEntity implements Partial<FilterOption> {
  @Field()
  id: string

  @Field()
  value: string

  @Field()
  label: string
}
