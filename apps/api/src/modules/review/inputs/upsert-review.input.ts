import { Field, InputType, Int } from '@nestjs/graphql'
import { IsOptional, IsUUID, Max, MaxLength, Min } from 'class-validator'

@InputType()
export class UpsertReviewInput {
  @Field()
  @IsUUID('4', { message: 'Invalid product ID' })
  productId: string

  @Field(() => Int)
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500, { message: 'Comment must be at most 500 characters' })
  comment: string | null
}
