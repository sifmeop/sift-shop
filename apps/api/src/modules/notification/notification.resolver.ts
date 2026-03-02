import { Mutation, Query, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { NotificationEntity } from './entities/notification.entity'
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
    @Authorized('id') userId: string
  ): Promise<NotificationEntity[]> {
    return await this.notificationService.markNotificationsAsRead(userId)
  }
}
