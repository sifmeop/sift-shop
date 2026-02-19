import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsUUID } from 'class-validator'

@InputType()
export class AddToCartInput {
  @Field()
  @IsString()
  @IsUUID('4')
  productId: string
}
