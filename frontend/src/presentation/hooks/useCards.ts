import { useState, useEffect, useCallback } from 'react';
import { Card, CardUserData } from '@/domain/entities';
import { useCardService } from '@/presentation/contexts/CardServiceContext';
import { ERROR_MESSAGES } from '@/shared/constants/strings';

export function useCards(tags?: string[]) {
  const cardService = useCardService();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardService.getAllCards(tags);
      setCards(data);
    } catch (err) {
      setError(ERROR_MESSAGES.LOAD_CARDS);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cardService, tags]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const createCard = async (data: CardUserData): Promise<Card> => {
    try {
      setError(null);
      const newCard = await cardService.createCard(data);
      setCards([...cards, newCard]);
      return newCard;
    } catch (err) {
      setError(ERROR_MESSAGES.CREATE_CARD);
      throw new Error(ERROR_MESSAGES.CREATE_CARD);
    }
  };

  return {
    cards,
    loading,
    error,
    createCard,
    refresh: loadCards,
  };
}

