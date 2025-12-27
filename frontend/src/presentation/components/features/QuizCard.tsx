import React, { useState } from 'react';
import { Card } from '@/domain/entities';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import './QuizCard.css';

interface QuizCardProps {
  card: Card;
  onSubmit: (cardId: string, isValid: boolean) => void;
  onForceValidate?: (cardId: string) => void;
}

export function QuizCard({ card, onSubmit, onForceValidate }: QuizCardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    onSubmit(card.id, isCorrect);
    setUserAnswer('');
    setShowResult(false);
  };

  const handleForceValidate = () => {
    if (onForceValidate) {
      onForceValidate(card.id);
    } else {
      onSubmit(card.id, true);
    }
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div className="quiz-card">
      <div className="quiz-card-header">
        <span className="quiz-card-tag">{card.tag || 'Sans tag'}</span>
        <span className="quiz-card-category">{card.category}</span>
      </div>

      <div className="quiz-card-question">
        <strong>Question:</strong>
        <p>{card.question}</p>
      </div>

      <div className="quiz-card-answer-input">
        <Input
          type="textarea"
          value={userAnswer}
          onChange={setUserAnswer}
          placeholder="Votre réponse..."
          rows={4}
        />
      </div>

      {!showResult ? (
        <div className="quiz-card-actions">
          <Button onClick={handleSubmit} disabled={!userAnswer.trim()}>
            Valider
          </Button>
        </div>
      ) : (
        <div className="quiz-card-result">
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="result-icon">✓</span>
                <span>Correct !</span>
              </>
            ) : (
              <>
                <span className="result-icon">✗</span>
                <span>Incorrect</span>
              </>
            )}
          </div>
          
          {!isCorrect && (
            <div className="correct-answer">
              <strong>Réponse attendue:</strong>
              <p>{card.answer}</p>
            </div>
          )}

          <div className="quiz-card-actions">
            {!isCorrect && onForceValidate && (
              <Button variant="secondary" onClick={handleForceValidate}>
                Forcer la validation
              </Button>
            )}
            <Button onClick={handleNext}>
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

