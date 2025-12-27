import React, { useState } from 'react';
import { Card } from '@/domain/entities';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { UI_STRINGS } from '@/shared/constants/strings';
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
        <span className="quiz-card-tag">{card.tag || UI_STRINGS.NO_TAG}</span>
        <span className="quiz-card-category">{card.category}</span>
      </div>

      <div className="quiz-card-question">
        <strong>{UI_STRINGS.QUESTION_LABEL}</strong>
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
            {UI_STRINGS.SUBMIT_BUTTON}
          </Button>
        </div>
      ) : (
        <div className="quiz-card-result">
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <span className="result-icon">✓</span>
                <span>{UI_STRINGS.CORRECT_ANSWER}</span>
              </>
            ) : (
              <>
                <span className="result-icon">✗</span>
                <span>{UI_STRINGS.INCORRECT_ANSWER}</span>
              </>
            )}
          </div>
          
          {!isCorrect && (
            <div className="correct-answer">
              <strong>{UI_STRINGS.EXPECTED_ANSWER_LABEL}</strong>
              <p>{card.answer}</p>
            </div>
          )}

          <div className="quiz-card-actions">
            {!isCorrect && onForceValidate && (
              <Button variant="secondary" onClick={handleForceValidate}>
                {UI_STRINGS.FORCE_VALIDATE_BUTTON}
              </Button>
            )}
            <Button onClick={handleNext}>
              {UI_STRINGS.NEXT_BUTTON}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

