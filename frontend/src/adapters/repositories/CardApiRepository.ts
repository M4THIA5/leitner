import { apiClient } from '@/infrastructure/http/apiClient';
import { ICardRepository } from '@/domain/repositories/ICardRepository';
import { Card, CardUserData } from '@/domain/entities/Card';

export class CardApiRepository implements ICardRepository {
  async findAll(tags?: string[]): Promise<Card[]> {
    const params = tags && tags.length > 0 ? { tags: tags.join(',') } : {};
    return await apiClient.get<Card[]>('/cards', params);
  }

  async create(data: CardUserData): Promise<Card> {
    return await apiClient.post<Card>('/cards', data);
  }

  async getQuizCards(date?: string): Promise<Card[]> {
    const params = date ? { date } : {};
    return await apiClient.get<Card[]>('/cards/quizz', params);
  }

  async answerCard(cardId: string, isValid: boolean): Promise<void> {
    await apiClient.patch(`/cards/${cardId}/answer`, { isValid });
  }
}

