import { IsNumber, Min } from 'class-validator'

export class UpdateFilterPositionDto {
  @IsNumber()
  @Min(0)
  new: number

  @IsNumber()
  @Min(0)
  old: number
}
