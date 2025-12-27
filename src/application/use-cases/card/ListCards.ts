import { ICardRepository } from "#domain/repositories/ICardRepository"
import { Card } from "#entities/Card"

export class ListCards {
  constructor(private cardRepository: ICardRepository) {}

  async execute(studentId: string, tags?: string[]): Promise<Card[]> {
    return this.cardRepository.findAll(studentId, tags)
  }
}
