import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Pusher from 'pusher'

@Injectable()
export class PusherService {
  readonly pusher: Pusher

  constructor(readonly configService: ConfigService) {
    this.pusher = new Pusher({
      appId: this.configService.getOrThrow<string>('PUSHER_APP_ID'),
      key: this.configService.getOrThrow<string>('PUSHER_KEY'),
      secret: this.configService.getOrThrow<string>('PUSHER_SECRET'),
      cluster: this.configService.getOrThrow<string>('PUSHER_CLUSTER')
    })
  }

  trigger(channel: string, event: string, data?: any): void {
    void this.pusher.trigger(channel, event, data).catch((error) => {
      Logger.error(`[Pusher] Trigger error: ${error}`)
    })
  }
}
