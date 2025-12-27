import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateCardDTO {
  @IsString()
  @IsNotEmpty()
  question!: string

  @IsString()
  @IsNotEmpty()
  answer!: string

  @IsString()
  @IsOptional()
  tag?: string
}
