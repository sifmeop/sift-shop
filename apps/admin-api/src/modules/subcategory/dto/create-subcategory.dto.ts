import { IsString } from 'class-validator'

export class CreateSubcategoryDto {
  @IsString()
  name: string

  @IsString()
  slug: string

  @IsString()
  image: string
}
