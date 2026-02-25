import { Injectable } from '@nestjs/common'
import { prisma } from '@sift-shop/database'

import { NotificationEntity } from './entities/notification.entity'

@Injectable()
export class NotificationService {
  async getNotifications(userId: string): Promise<NotificationEntity[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    return notifications
  }
  async markNotificationsAsRead(
    userId: string,
    ids: string[]
  ): Promise<NotificationEntity[]> {
    const notifications = await prisma.notification.updateManyAndReturn({
      where: {
        id: {
          in: ids
        },
        userId
      },
      data: {
        readAt: new Date()
      }
    })

    return notifications
  }
}
