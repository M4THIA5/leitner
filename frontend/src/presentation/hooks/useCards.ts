import { useState, useEffect } from 'react';
import { Card, CardUserData } from '@/domain/entities';
import { CardService } from '@/application/services/CardService';
import { CardApiRepository } from '@/adapters/repositories/CardApiRepository';

const cardService = new CardService(new CardApiRepository());

export function useCards(tags?: string[]) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, [tags]);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cardService.getAllCards(tags);
      setCards(data);
    } catch (err) {
      setError('Erreur lors du chargement des cartes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (data: CardUserData): Promise<Card> => {
    try {
      setError(null);
      const newCard = await cardService.createCard(data);
      setCards([...cards, newCard]);
      return newCard;
    } catch (err) {
      const errorMessage = 'Erreur lors de la création de la carte';
      setError(errorMessage);
      throw new Error(errorMessage);
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

