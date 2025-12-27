import { ICardRepository } from "#domain/repositories/ICardRepository"
import { Card } from "#entities/Card"
import { CreateCardDTO } from "#dtos/card/CreateCardDTO"
import { v4 as uuidv4 } from "uuid"

export class CreateCard {
  constructor(private cardRepository: ICardRepository) {}

  async execute(dto: CreateCardDTO, studentId: string): Promise<Card> {
    const card = Card.create({
      id: uuidv4(),
      question: dto.question,
      answer: dto.answer,
      tag: dto.tag,
      studentId,
    })

    await this.cardRepository.save(card)
    return card
  }
}
