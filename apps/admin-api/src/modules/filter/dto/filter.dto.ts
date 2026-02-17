import { IsArray, IsOptional, IsString } from 'class-validator'

export class FilterDto {
  @IsString()
  name: string

  @IsString()
  value: string

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
