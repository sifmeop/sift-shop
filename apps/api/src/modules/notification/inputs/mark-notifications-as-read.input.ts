import { Field, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsArray, IsUUID } from 'class-validator'

@InputType()
export class MarkNotificationsAsReadInput {
  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  ids: string[]
}
