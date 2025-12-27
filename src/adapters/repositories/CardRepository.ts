import { Card } from "#entities/Card"
import { ICardRepository } from "#domain/repositories/ICardRepository"
import prisma from "#db/db"
import { CardMapper } from "#mappers/CardMapper"
import { Category } from "#entities/Category"

export class CardRepository implements ICardRepository {
  async save(card: Card): Promise<void> {
    const data = CardMapper.toPersistence(card)
    await prisma.card.create({
      data,
    })
  }

  async findById(id: string): Promise<Card | null> {
    const prismaCard = await prisma.card.findUnique({
      where: { id },
    })

    if (!prismaCard) return null

    return CardMapper.toDomain(prismaCard)
  }

  async findAll(studentId: string, tags?: string[]): Promise<Card[]> {
    const prismaCards = await prisma.card.findMany({
      where: {
        studentId,
        ...(tags && tags.length > 0 ? { tag: { in: tags } } : {}),
      },
    })

    return prismaCards.map(CardMapper.toDomain)
  }

  async findForQuizz(studentId: string, date: Date): Promise<Card[]> {
    const allCards = await prisma.card.findMany({
      where: { studentId },
    })

    return allCards
      .map(CardMapper.toDomain)
      .filter((card) => this.shouldBeInQuizz(card, date))
  }

  private shouldBeInQuizz(card: Card, date: Date): boolean {
    if (card.category === Category.DONE) return false
    if (!card.lastAnsweredAt) return true

    const diffInDays = Math.floor(
      (date.getTime() - card.lastAnsweredAt.getTime()) / (1000 * 60 * 60 * 24),
    )

    const frequency: Record<Category, number> = {
      [Category.FIRST]: 1,
      [Category.SECOND]: 2,
      [Category.THIRD]: 4,
      [Category.FOURTH]: 8,
      [Category.FIFTH]: 16,
      [Category.SIXTH]: 32,
      [Category.SEVENTH]: 64,
      [Category.DONE]: 0,
    }

    return diffInDays >= frequency[card.category]
  }

  async update(card: Card): Promise<void> {
    const data = CardMapper.toPersistence(card)
    await prisma.card.update({
      where: { id: card.id },
      data: {
        question: data.question,
        answer: data.answer,
        tag: data.tag,
        category: data.category,
        lastAnsweredAt: data.lastAnsweredAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.card.delete({
      where: { id },
    })
  }
}
