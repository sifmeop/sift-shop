import { Field, ID, ObjectType } from '@nestjs/graphql'
import { FilterOption } from '@sift-shop/database'

@ObjectType()
export class FilterOptionEntity implements Partial<FilterOption> {
  @Field(() => ID)
  id: string

  @Field()
  value: string

  @Field()
  label: string
}
