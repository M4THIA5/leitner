import React, { useState } from 'react';
import { Card } from '@/domain/entities';
import { UI_STRINGS } from '@/shared/constants/strings';
import './CardDisplay.css';

interface CardDisplayProps {
  card: Card;
  onDelete?: (id: string) => void;
}

export function CardDisplay({ card, onDelete }: CardDisplayProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="card-display">
      <div className="card-display-header">
        <span className="card-display-tag">{card.tag || UI_STRINGS.NO_TAG}</span>
        <span className="card-display-category">{card.category}</span>
        {onDelete && (
          <button
            className="card-display-delete"
            onClick={() => onDelete(card.id)}
            aria-label={UI_STRINGS.DELETE_BUTTON}
          >
            ×
          </button>
        )}
      </div>
      
      <div className="card-display-question">
        <strong>{UI_STRINGS.QUESTION_LABEL}</strong>
        <p>{card.question}</p>
      </div>

      <div className="card-display-answer">
        <div className="card-display-answer-header">
          <strong>{UI_STRINGS.ANSWER_LABEL}</strong>
          <button
            className="card-display-toggle"
            onClick={handleToggleAnswer}
            aria-label={showAnswer ? 'Masquer la réponse' : 'Afficher la réponse'}
          >
            {showAnswer ? UI_STRINGS.HIDE_ANSWER : UI_STRINGS.SHOW_ANSWER}
          </button>
        </div>
        <div className={`card-display-answer-content ${showAnswer ? 'revealed' : 'hidden'}`}>
          {showAnswer ? card.answer : UI_STRINGS.HIDDEN_ANSWER_PLACEHOLDER}
        </div>
      </div>
    </div>
  );
}

