import { Field, Int, ObjectType } from '@nestjs/graphql'

import { FilterOption } from '~/generated/prisma/client'

@ObjectType()
export class FilterOptionEntity implements Partial<FilterOption> {
  @Field()
  id: string

  @Field()
  value: string

  @Field()
  label: string

  @Field(() => Int)
  position: number
}
