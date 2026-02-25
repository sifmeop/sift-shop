import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Notification, NotificationType, Prisma } from '@sift-shop/database'
import { GraphQLJSON } from 'graphql-scalars'

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Notification type'
})

@ObjectType()
export class NotificationEntity implements Partial<Notification> {
  @Field()
  id: string

  @Field(() => GraphQLJSON, { nullable: true })
  data: Prisma.JsonValue | null

  @Field(() => NotificationType)
  type: NotificationType

  @Field(() => Date, { nullable: true })
  readAt: Date | null

  @Field()
  createdAt: Date
}
