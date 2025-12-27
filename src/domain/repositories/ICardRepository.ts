import { Card } from "#entities/Card"

export interface ICardRepository {
  save(card: Card): Promise<void>
  findById(id: string): Promise<Card | null>
  findAll(studentId: string, tags?: string[]): Promise<Card[]>
  findForQuizz(studentId: string, date: Date): Promise<Card[]>
  update(card: Card): Promise<void>
  delete(id: string): Promise<void>
}
