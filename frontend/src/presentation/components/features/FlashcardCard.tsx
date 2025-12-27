import React, { useState } from 'react';
import { Card } from '@/domain/entities';
import './FlashcardCard.css';

interface FlashcardCardProps {
  card: Card;
  onDelete?: (id: string) => void;
}

export function FlashcardCard({ card, onDelete }: FlashcardCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcard-card">
      <div className="flashcard-header">
        <span className="flashcard-tag">{card.tag || 'Sans tag'}</span>
        <span className="flashcard-category">{card.category}</span>
        {onDelete && (
          <button
            className="flashcard-delete"
            onClick={() => onDelete(card.id)}
            aria-label="Supprimer"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="flashcard-question">
        <strong>Question:</strong>
        <p>{card.question}</p>
      </div>

      <div className="flashcard-answer">
        <div className="flashcard-answer-header">
          <strong>Réponse:</strong>
          <button
            className="flashcard-toggle"
            onClick={handleToggleAnswer}
            aria-label={showAnswer ? 'Masquer la réponse' : 'Afficher la réponse'}
          >
            {showAnswer ? '👁️ Masquer' : '👁️ Afficher'}
          </button>
        </div>
        <div className={`flashcard-answer-content ${showAnswer ? 'revealed' : 'hidden'}`}>
          {showAnswer ? card.answer : '••••••••'}
        </div>
      </div>
    </div>
  );
}

