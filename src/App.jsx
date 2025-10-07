// src/App.jsx
import React, { useState } from "react";
import Flashcards from "./Flashcards";
import { cards as initialCards } from "./datacards";
import "./index.css";

export default function App() {
  const [cards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [shuffled, setShuffled] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [mastered, setMastered] = useState(new Set());

  const total = cards.length;
  const currentCard = cards[currentIndex];

  const handleFlip = () => setFlipped((f) => !f);

  // ✅ Sequential navigation
  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setGuess("");
      setFeedback("");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setGuess("");
      setFeedback("");
    }
  };

  // 🎲 Random navigation
  const handleRandom = () => {
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
    setGuess("");
    setFeedback("");
  };

  const handleShuffle = () => {
    if (!shuffled) {
      // Shuffle cards
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      setShuffled(true);
      setCurrentIndex(0);
      setFlipped(false);
      setGuess("");
      setFeedback("");
      // Replace the old card list with shuffled one
      cards.splice(0, cards.length, ...shuffledCards);
    } else {
      // Reset to original order
      setShuffled(false);
      setCurrentIndex(0);
      setFlipped(false);
      setGuess("");
      setFeedback("");
      cards.splice(0, cards.length, ...initialCards);
    }
  };


  const handleSubmit = () => {
    const normalize = (str) =>
      str.toLowerCase().replace(/[^\w\s]|_/g, "").trim();

    if (normalize(guess) === normalize(currentCard.answer)) {
      setFeedback("✅ Correct!");
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
    } else {
      setFeedback("❌ Try again!");
      setStreak(0);
    }
  };

  const handleMastered = () => {
    const masteredCard = currentCard;
    setMastered([...mastered, masteredCard]);
    const remaining = cards.filter((c) => c !== masteredCard);
    setCurrentIndex(0);
    setFlipped(false);
    setGuess("");
    setFeedback("");
    cards.splice(0, cards.length, ...remaining);
  };




  return (
    <div className="app">
      <header className="header">
        <h1>Data Structures & Algorithms Flashcards</h1>
        <p className="desc">Type your guess before flipping to check the answer!</p>
        <p className="meta">Total cards: {total}</p>
        <p className="streak"> Current Streak: {streak} |  Best Streak: {bestStreak}</p>
      </header>

      <main className="main">
        {total === 0 ? (
          <p>No cards yet. Add some to <code>src/datacards.js</code>.</p>
        ) : (
          <>
            <Flashcards card={currentCard} flipped={flipped} onFlip={handleFlip} />

            {/* Input Section */}
            <div className="input-section">
              <input
                type="text"
                placeholder="Enter your guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
              {feedback && <p className="feedback">{feedback}</p>}
            </div>

            {/* Navigation Controls */}
            <div className="controls">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn"
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === total - 1}
                className="btn"
              >
                Next →
              </button>

              <button onClick={handleShuffle} className="btn">
                {shuffled ? "Unshuffle" : "Shuffle"}
              </button>

              <button onClick={handleMastered} className="btn">
                ✅ Mark Mastered</button>
              <p>Mastered cards: {mastered.length}</p>

            </div>

            {/* Footer Info */}
            <div className="footer-meta">
              <small>
                Card {currentIndex + 1} / {total} • Difficulty:{" "}
                {currentCard.difficulty} • Subject: {currentCard.subject}
              </small>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

