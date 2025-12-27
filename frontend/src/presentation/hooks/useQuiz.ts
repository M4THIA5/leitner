import { useState, useEffect } from 'react';
import { Card } from '@/domain/entities';
import { CardService } from '@/application/services/CardService';
import { CardApiRepository } from '@/adapters/repositories/CardApiRepository';

const cardService = new CardService(new CardApiRepository());

export function useQuiz(date?: string) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuizCards();
  }, [date]);

  const loadQuizCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardService.getQuizCards(date);
      setCards(data);
    } catch (err) {
      setError('Erreur lors du chargement du quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const answerCard = async (cardId: string, isValid: boolean): Promise<void> => {
    try {
      setError(null);
      await cardService.answerCard(cardId, isValid);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (err) {
      const errorMessage = 'Erreur lors de l\'envoi de la réponse';
      setError(errorMessage);
      throw new Error(errorMessage);
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

