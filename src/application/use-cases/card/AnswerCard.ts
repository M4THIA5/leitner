import { ICardRepository } from "#domain/repositories/ICardRepository"
import { Card } from "#entities/Card"
import { Category } from "#entities/Category"

export class AnswerCard {
  constructor(private cardRepository: ICardRepository) {}

  async execute(cardId: string, studentId: string, isValid: boolean): Promise<void> {
    const card = await this.cardRepository.findById(cardId)

    if (!card || card.studentId !== studentId) {
      throw new Error("Card not found")
    }

    const nextCategory = this.calculateNextCategory(card.category, isValid)
    
    const updatedCard = new Card(
      card.id,
      card.question,
      card.answer,
      nextCategory,
      card.studentId,
      card.tag,
      new Date(), // lastAnsweredAt
    )

    await this.cardRepository.update(updatedCard)
  }

  private calculateNextCategory(current: Category, isValid: boolean): Category {
    if (!isValid) return Category.FIRST

    const categories = [
      Category.FIRST,
      Category.SECOND,
      Category.THIRD,
      Category.FOURTH,
      Category.FIFTH,
      Category.SIXTH,
      Category.SEVENTH,
      Category.DONE,
    ]

    const currentIndex = categories.indexOf(current)
    if (currentIndex === categories.length - 1) return Category.DONE
    
    return categories[currentIndex + 1]
  }
}
