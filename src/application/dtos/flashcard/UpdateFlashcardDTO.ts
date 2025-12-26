import { IsString, IsNotEmpty, IsArray, IsOptional, IsUUID } from "class-validator"

export class UpdateFlashcardDTO {
  @IsUUID()
  @IsNotEmpty()
  id!: string

  @IsString()
  @IsNotEmpty()
  studentId!: string

  @IsString()
  @IsOptional()
  question?: string

  @IsString()
  @IsOptional()
  answer?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]
}
