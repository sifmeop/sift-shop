import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 0 })
  @IsNumber()
  skip: number

  @Field(() => Int, { defaultValue: 10 })
  @IsNumber()
  take: number
}
