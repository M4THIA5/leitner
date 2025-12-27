import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/presentation/components/ui/Button';
import { UI_STRINGS } from '@/shared/constants/strings';
import './HistoryPage.css';

export function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="history-page">
      <header className="history-header">
        <div className="header-left">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            {UI_STRINGS.BACK_BUTTON}
          </Button>
          <h1>Historique des quiz</h1>
        </div>
      </header>

      <div className="history-content">
        <div className="empty-state">
          <p>L'historique des quiz sera disponible prochainement</p>
        </div>
      </div>
    </div>
  );
}

