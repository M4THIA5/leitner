import { Card } from "#entities/Card"
import { Category } from "#entities/Category"

export class CardMapper {
  static toDomain(raw: any): Card {
    return new Card(
      raw.id,
      raw.question,
      raw.answer,
      raw.category as Category,
      raw.studentId,
      raw.tag || undefined,
      raw.lastAnsweredAt || undefined,
    )
  }

  static toPersistence(card: Card): any {
    return {
      id: card.id,
      question: card.question,
      answer: card.answer,
      tag: card.tag,
      category: card.category,
      lastAnsweredAt: card.lastAnsweredAt,
      studentId: card.studentId,
    }
  }

  static toResponse(card: Card): any {
    return {
      id: card.id,
      question: card.question,
      answer: card.answer,
      tag: card.tag,
      category: card.category,
    }
  }
}
