import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class RemoveFromCartInput {
  @Field()
  @IsString()
  @IsUUID('4')
  id: string
}
