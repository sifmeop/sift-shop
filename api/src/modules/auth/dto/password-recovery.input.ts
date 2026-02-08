import { Field, InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  token: string

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must be at most 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  })
  password: string
}
