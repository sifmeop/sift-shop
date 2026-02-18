import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class EmailConfirmationInput {
  @Field()
  @IsString()
  @IsUUID('4')
  token: string
}
