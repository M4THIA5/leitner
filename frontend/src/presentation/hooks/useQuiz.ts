import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/domain/entities';
import { useCardService } from '@/presentation/contexts/CardServiceContext';
import { ERROR_MESSAGES } from '@/shared/constants/strings';

export function useQuiz(date?: string) {
  const cardService = useCardService();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuizCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardService.getQuizCards(date);
      setCards(data);
    } catch (err) {
      setError(ERROR_MESSAGES.LOAD_QUIZ);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cardService, date]);

  useEffect(() => {
    loadQuizCards();
  }, [loadQuizCards]);

  const answerCard = async (cardId: string, isValid: boolean): Promise<void> => {
    try {
      setError(null);
      await cardService.answerCard(cardId, isValid);
      setCards(cards.filter((card: Card) => card.id !== cardId));
    } catch (err) {
      setError(ERROR_MESSAGES.ANSWER_CARD);
      throw new Error(ERROR_MESSAGES.ANSWER_CARD);
    }
  };

  return {
    cards,
    loading,
    error,
    answerCard,
    refresh: loadQuizCards,
  };
}

