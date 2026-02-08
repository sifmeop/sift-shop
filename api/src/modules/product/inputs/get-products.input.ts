import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class GetProductsInput {
  @Field()
  @IsString()
  category: string

  @Field()
  @IsString()
  subcategory: string
}
