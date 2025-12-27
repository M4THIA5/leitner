import React from 'react';
import './HistoryPage.css';

export function HistoryPage() {
  return (
    <div className="history-page">
      <header className="history-header">
        <h1>Historique des quiz</h1>
      </header>

      <div className="history-content">
        <div className="empty-state">
          <p>L'historique des quiz sera disponible prochainement</p>
        </div>
      </div>
    </div>
  );
}

