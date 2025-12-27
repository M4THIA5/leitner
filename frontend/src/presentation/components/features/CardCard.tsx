import React, { useState } from 'react';
import { Card } from '@/domain/entities';
import './CardCard.css';

interface CardCardProps {
  card: Card;
  onDelete?: (id: string) => void;
}

export function CardCard({ card, onDelete }: CardCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="card-card">
      <div className="card-card-header">
        <span className="card-card-tag">{card.tag || 'Sans tag'}</span>
        <span className="card-card-category">{card.category}</span>
        {onDelete && (
          <button
            className="card-card-delete"
            onClick={() => onDelete(card.id)}
            aria-label="Supprimer"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="card-card-question">
        <strong>Question:</strong>
        <p>{card.question}</p>
      </div>

      <div className="card-card-answer">
        <div className="card-card-answer-header">
          <strong>Réponse:</strong>
          <button
            className="card-card-toggle"
            onClick={handleToggleAnswer}
            aria-label={showAnswer ? 'Masquer la réponse' : 'Afficher la réponse'}
          >
            {showAnswer ? '👁️ Masquer' : '👁️ Afficher'}
          </button>
        </div>
        <div className={`card-card-answer-content ${showAnswer ? 'revealed' : 'hidden'}`}>
          {showAnswer ? card.answer : '••••••••'}
        </div>
      </div>
    </div>
  );
}

