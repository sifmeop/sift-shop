import { IsString } from 'class-validator'

export class EmailConfirmationDto {
  @IsString()
  token: string
}
