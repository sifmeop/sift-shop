import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Review } from '@sift-shop/database'

@ObjectType()
export class ReviewEntity implements Partial<Review> {
  @Field(() => ID)
  id: string

  @Field()
  fullName: string

  @Field(() => Int)
  rating: number

  @Field(() => String, { nullable: true })
  comment: string | null

  @Field()
  userId: string

  @Field(() => Date)
  createdAt: Date
}
