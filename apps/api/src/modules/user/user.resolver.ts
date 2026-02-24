import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { Authorized } from '~/common/decorators/authorized.decorator'

import { AccountDetailsEntity } from './entities/account-details.entity'
import { UpdateAccountDetailsInput } from './inputs/update-account-details.input'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AccountDetailsEntity)
  async updateAccountDetails(
    @Authorized('id') userId: string,
    @Args('input', { type: () => UpdateAccountDetailsInput })
    input: UpdateAccountDetailsInput
  ): Promise<AccountDetailsEntity> {
    return await this.userService.updateAccountDetails(userId, input)
  }
}
