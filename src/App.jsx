// src/App.jsx
import React, { useState } from "react";
import Flashcards from "./Flashcards"; // matches Flashcards.jsx exactly
import { cards as initialCards } from "./datacards"; // matches dataCards.js exactly
import "./index.css";
import "./App.css";

export default function App() {
  const [cards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const total = cards.length;
  const currentCard = cards[currentIndex];

  const handleFlip = () => setFlipped(f => !f);

  const handleNext = () => {
    if (total <= 1) {
      setFlipped(false);
      return;
    }
    let next = currentIndex;

    while (next === currentIndex) {
      next = Math.floor(Math.random() * total);
    }
    setCurrentIndex(next);
    setFlipped(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Data Structures & Algorithms Flashcards</h1>
        <p className="desc">Practice key DSA concepts — click a card to flip it.</p>
        <p className="meta">Total cards: {total}</p>
      </header>

      <main className="main">
        {total === 0 ? (
          <p>No cards yet. Add some to <code>src/data/cards.js</code>.</p>
        ) : (
          <>
            <Flashcards card={currentCard} flipped={flipped} onFlip={handleFlip} />

            <div className="controls">
              <button onClick={handleNext} className="btn">Next (random)</button>
            </div>

            <div className="footer-meta">
              <small>Card {currentIndex + 1} / {total} • Difficulty: {currentCard.difficulty} • Subject: {currentCard.subject}</small>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

