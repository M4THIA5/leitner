import { Card, CardUserData } from '@/domain/entities/Card';

export interface ICardRepository {
  findAll(tags?: string[]): Promise<Card[]>;
  create(data: CardUserData): Promise<Card>;
  getQuizCards(date?: string): Promise<Card[]>;
  answerCard(cardId: string, isValid: boolean): Promise<void>;
}
