import { Field, InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

import { Match } from '~/common/decorators/match.decorator'
import { User } from '~/generated/prisma/client'

@InputType()
export class SignUpInput implements Partial<User> {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  @MaxLength(50, { message: 'Full name must be at most 50 characters' })
  fullName: string

  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must be at most 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  })
  password: string

  @Field()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string
}
