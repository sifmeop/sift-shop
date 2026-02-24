import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GetOrderByPaymentIdInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'ID is required' })
  id: string
}
