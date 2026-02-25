import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { NotificationEntity } from './entities/notification.entity'
import { MarkNotificationsAsReadInput } from './inputs/mark-notifications-as-read.input'
import { NotificationService } from './notification.service'

@Resolver(() => NotificationEntity)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [NotificationEntity])
  notifications(
    @Authorized('id') userId: string
  ): Promise<NotificationEntity[]> {
    return this.notificationService.getNotifications(userId)
  }

  @Mutation(() => [NotificationEntity])
  async markNotificationsAsRead(
    @Authorized('id') userId: string,
    @Args('input', { type: () => MarkNotificationsAsReadInput })
    input: MarkNotificationsAsReadInput
  ): Promise<NotificationEntity[]> {
    return await this.notificationService.markNotificationsAsRead(
      userId,
      input.ids
    )
  }
}
