import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { PaymentMethod } from '@sift-shop/database'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches
} from 'class-validator'

registerEnumType(PaymentMethod, {
  name: 'PaymentMethod',
  description: 'Payment method'
})

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Last name must contain only English letters'
  })
  lastName: string

  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @Matches(/^\+?[0-9\s\-()]{7,15}$/, { message: 'Invalid phone number' })
  phone: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'City must contain only English letters'
  })
  city: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Country must contain only English letters'
  })
  country: string

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'State must contain only English letters'
  })
  state?: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  @Matches(/^[A-Za-z0-9\s]+$/, {
    message: 'Address must contain only English letters'
  })
  address: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Zip code is required' })
  @Length(4, 10, { message: 'Zip code length should be between 4 and 10' })
  zipCode: string

  @Field(() => PaymentMethod)
  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  method: PaymentMethod
}
