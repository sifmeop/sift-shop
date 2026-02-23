import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GetOrderBySessionInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'ID is required' })
  id: string
}
