import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsString, IsUUID } from 'class-validator'

@InputType()
export class RemoveFromCartInput {
  @Field()
  @IsString()
  @IsUUID('4')
  id: string

  @Field(() => Int)
  @IsInt()
  quantity: number
}
