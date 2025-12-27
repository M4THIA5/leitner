import { Card } from "#entities/Card"
import { ICardRepository } from "#domain/repositories/ICardRepository"

export class MockCardRepository implements ICardRepository {
  private cards: Card[] = []

  async save(card: Card): Promise<void> {
    this.cards.push(card)
  }

  async findById(id: string): Promise<Card | null> {
    return this.cards.find((c) => c.id === id) || null
  }

  async findAll(studentId: string, tags?: string[]): Promise<Card[]> {
    return this.cards.filter((c) => {
      const matchStudent = c.studentId === studentId
      const matchTags = !tags || tags.length === 0 || (c.tag && tags.includes(c.tag))
      return matchStudent && matchTags
    })
  }

  async findForQuizz(studentId: string, date: Date): Promise<Card[]> {
    // Basic mock implementation for quizz filtering
    return this.cards.filter((c) => c.studentId === studentId)
  }

  async update(card: Card): Promise<void> {
    const index = this.cards.findIndex((c) => c.id === card.id)
    if (index !== -1) {
      this.cards[index] = card
    }
  }

  async delete(id: string): Promise<void> {
    this.cards = this.cards.filter((c) => c.id !== id)
  }
}
