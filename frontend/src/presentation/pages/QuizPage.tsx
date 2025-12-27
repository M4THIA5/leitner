import React from 'react';
import { useQuiz } from '@/presentation/hooks/useQuiz';
import { QuizCard } from '@/presentation/components/features/QuizCard';
import './QuizPage.css';

export function QuizPage() {
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
        <div className="loading">Chargement du quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <div className="error">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <h1>Quiz du jour</h1>
        <div className="quiz-stats">
          {cards.length} carte{cards.length > 1 ? 's' : ''} à réviser
        </div>
      </header>

      <div className="quiz-cards">
        {cards.length === 0 ? (
          <div className="empty-state">
            <p>🎉 Aucune carte à réviser aujourd'hui !</p>
            <p>Excellent travail !</p>
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

