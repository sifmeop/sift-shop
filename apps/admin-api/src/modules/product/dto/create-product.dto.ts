import { Transform } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @Transform(({ value }) => Number(value))
  @IsNumber()
  stock: number

  @IsString()
  @IsNotEmpty()
  price: string

  @Transform(({ value }) => {
    if (typeof value === 'string')
      try {
        return JSON.parse(value) as Record<string, string>
      } catch {
        return value
      }
    return value as Record<string, string>
  })
  @IsObject()
  @IsOptional()
  specifications: Record<string, string>

  @Transform(({ value }) => {
    if (typeof value === 'string')
      try {
        return JSON.parse(value) as string[]
      } catch {
        return value
      }
    return value as string[]
  })
  @IsArray()
  @IsUUID('4', { each: true })
  filterValues: string[]

  @IsString()
  @IsNotEmpty()
  subcategorySlug: string
}
