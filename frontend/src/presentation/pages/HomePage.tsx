import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">Enlightner</h1>
        <button className="home-logout">Se déconnecter</button>
      </header>

      <main className="home-main">
        <div className="home-cards-grid">
          <Link to="/cards" className="home-card home-card-primary">
            <div className="home-card-content">
              <h2>Mes cartes</h2>
            </div>
          </Link>

          <Link to="/quiz" className="home-card home-card-primary">
            <div className="home-card-content">
              <h2>Quiz du jour</h2>
            </div>
          </Link>

          <Link to="/history" className="home-card home-card-secondary">
            <div className="home-card-content">
              <h2>historique des quizz</h2>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

