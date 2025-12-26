import { IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator"

export class CreateFlashcardDTO {
  @IsString()
  @IsNotEmpty()
  question!: string

  @IsString()
  @IsNotEmpty()
  answer!: string

  @IsString()
  @IsNotEmpty()
  studentId!: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
