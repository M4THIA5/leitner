import { Card, CardUserData } from '@/domain/entities';
import { ICardRepository } from '@/domain/repositories/ICardRepository';

export class CardService {
  constructor(private cardRepository: ICardRepository) {}

  async getAllCards(tags?: string[]): Promise<Card[]> {
    return await this.cardRepository.findAll(tags);
  }

  async createCard(data: CardUserData): Promise<Card> {
    return await this.cardRepository.create(data);
  }

  async getQuizCards(date?: string): Promise<Card[]> {
    return await this.cardRepository.getQuizCards(date);
  }

  async answerCard(cardId: string, isValid: boolean): Promise<void> {
    return await this.cardRepository.answerCard(cardId, isValid);
  }
}

