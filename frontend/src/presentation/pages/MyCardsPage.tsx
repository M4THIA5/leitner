import React, { useState } from 'react';
import { useCards } from '@/presentation/hooks/useCards';
import { CardDisplay } from '@/presentation/components/features/CardDisplay';
import { Button } from '@/presentation/components/ui/Button';
import { Input } from '@/presentation/components/ui/Input';
import { CardUserData } from '@/domain/entities';
import './MyCardsPage.css';

export function MyCardsPage() {
  const { cards, loading, error, createCard } = useCards();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCard, setNewCard] = useState<CardUserData>({
    question: '',
    answer: '',
    tag: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createCard(newCard);
      setNewCard({ question: '', answer: '', tag: '' });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating card:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="my-cards-page">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-cards-page">
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="my-cards-page">
      <header className="my-cards-header">
        <h1>Mes cartes</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Annuler' : '+ Nouvelle carte'}
        </Button>
      </header>

      {showCreateForm && (
        <div className="create-card-form">
          <h2>Créer une nouvelle carte</h2>
          <form onSubmit={handleCreateCard}>
            <Input
              type="textarea"
              value={newCard.question}
              onChange={(value) => setNewCard({ ...newCard, question: value })}
              placeholder="Question..."
              label="Question"
              rows={3}
            />
            <Input
              type="textarea"
              value={newCard.answer}
              onChange={(value) => setNewCard({ ...newCard, answer: value })}
              placeholder="Réponse..."
              label="Réponse"
              rows={3}
            />
            <Input
              type="text"
              value={newCard.tag || ''}
              onChange={(value) => setNewCard({ ...newCard, tag: value })}
              placeholder="Tag (optionnel)..."
              label="Tag"
            />
            <div className="form-actions">
              <Button type="submit" disabled={!newCard.question || !newCard.answer || isSubmitting}>
                Créer
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="cards-list">
        {cards.length === 0 ? (
          <div className="empty-state">Aucune carte pour le moment</div>
        ) : (
          cards.map((card) => <CardDisplay key={card.id} card={card} />)
        )}
      </div>
    </div>
  );
}

