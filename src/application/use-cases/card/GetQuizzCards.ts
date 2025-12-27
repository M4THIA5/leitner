import { ICardRepository } from "#domain/repositories/ICardRepository"
import { Card } from "#entities/Card"

export class GetQuizzCards {
  constructor(private cardRepository: ICardRepository) {}

  async execute(studentId: string, date?: string): Promise<Card[]> {
    const quizzDate = date ? new Date(date) : new Date()
    return this.cardRepository.findForQuizz(studentId, quizzDate)
  }
}
