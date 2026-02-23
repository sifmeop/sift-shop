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
  lastName: string

  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @Matches(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number' })
  phone: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string

  @Field()
  @IsString()
  @IsOptional()
  state?: string

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Zip code is required' })
  @Length(4, 10, { message: 'Zip code length should be between 4 and 10' })
  zipCode: string

  @Field(() => PaymentMethod)
  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  method: PaymentMethod

  // @Field(() => String)
  // @IsString()
  // @IsIn(paymentValues, { message: 'Invalid payment method' })
  // method: PaymentMethod
}
