// src/components/Flashcards.jsx
import React from "react";

export default function Flashcards({ card, flipped, onFlip }) {
    if (!card) return null;

    return (
        <div
            className="card"
            role="button"
            tabIndex={0}
            onClick={onFlip}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onFlip(); }}
            aria-pressed={flipped}
        >
            <div className={`card-inner ${flipped ? "is-flipped" : ""}`}>
                <div className="card-face card-front">
                    {card.image && (
                        // conditional rendering avoids passing empty src ""
                        <img src={card.image} alt={card.question} className="card-image" />
                    )}
                    <div className="card-text">{card.question}</div>
                </div>

                <div className="card-face card-back">
                    {card.image && (
                        <img src={card.image} alt={card.question} className="card-image" />
                    )}
                    <div className="card-text">{card.answer}</div>
                </div>
            </div>
        </div>
    );
}
