import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/presentation/hooks/useQuiz';
import { QuizCard } from '@/presentation/components/features/QuizCard';
import { Button } from '@/presentation/components/ui/Button';
import { UI_STRINGS } from '@/shared/constants/strings';
import './QuizPage.css';

export function QuizPage() {
  const navigate = useNavigate();
  const { cards, loading, error, answerCard } = useQuiz();

  const handleAnswer = async (cardId: string, isValid: boolean) => {
    try {
      await answerCard(cardId, isValid);
    } catch (err) {
      console.error('Error answering card:', err);
    }
  };

  const handleForceValidate = (cardId: string) => {
    handleAnswer(cardId, true);
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <header className="quiz-header">
          <div className="header-left">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              {UI_STRINGS.BACK_BUTTON}
            </Button>
            <h1>Quiz du jour</h1>
          </div>
        </header>
        <div className="loading">{UI_STRINGS.LOADING_QUIZ}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <header className="quiz-header">
          <div className="header-left">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              {UI_STRINGS.BACK_BUTTON}
            </Button>
            <h1>Quiz du jour</h1>
          </div>
        </header>
        <div className="error">{UI_STRINGS.ERROR_PREFIX} {error}</div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <div className="header-left">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            {UI_STRINGS.BACK_BUTTON}
          </Button>
          <h1>Quiz du jour</h1>
        </div>
        <div className="quiz-stats">
          {cards.length} carte{cards.length > 1 ? 's' : ''} à réviser
        </div>
      </header>

      <div className="quiz-cards">
        {cards.length === 0 ? (
          <div className="empty-state">
            <p>{UI_STRINGS.NO_QUIZ_CARDS}</p>
            <p>{UI_STRINGS.EXCELLENT_WORK}</p>
          </div>
        ) : (
          cards.map((card) => (
            <QuizCard
              key={card.id}
              card={card}
              onSubmit={handleAnswer}
              onForceValidate={handleForceValidate}
            />
          ))
        )}
      </div>
    </div>
  );
}

