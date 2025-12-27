import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/presentation/pages/HomePage';
import { MyCardsPage } from '@/presentation/pages/MyCardsPage';
import { QuizPage } from '@/presentation/pages/QuizPage';
import { HistoryPage } from '@/presentation/pages/HistoryPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<MyCardsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

