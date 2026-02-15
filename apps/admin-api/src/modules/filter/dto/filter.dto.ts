import { FilterType } from '@sift-shop/database'
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'

export class FilterDto {
  @IsString()
  name: string

  @IsString()
  value: string

  @IsString()
  @IsEnum(FilterType)
  type: FilterType

  @IsString()
  @IsOptional()
  position?: number

  @IsArray()
  options: FilterOptionDto[]
}

class FilterOptionDto {
  @IsString()
  label: string

  @IsString()
  value: string

  @IsString()
  position: number
}
