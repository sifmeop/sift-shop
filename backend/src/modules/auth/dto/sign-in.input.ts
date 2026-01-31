import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

import { User } from '~/generated/prisma/client'

@InputType()
export class SignInInput implements Partial<User> {
  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  })
  password: string
}
