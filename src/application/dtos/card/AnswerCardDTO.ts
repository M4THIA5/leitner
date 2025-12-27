import { IsBoolean, IsNotEmpty } from "class-validator"

export class AnswerCardDTO {
  @IsBoolean()
  @IsNotEmpty()
  isValid!: boolean
}
