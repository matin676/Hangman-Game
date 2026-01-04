import React from "react";

export default function GuessesText({ incorrectGuesses, maxGuesses = 6 }) {
  const remaining = maxGuesses - incorrectGuesses;
  const isLow = remaining <= 2;

  return (
    <div className={`guesses-container ${isLow ? "guesses-danger" : ""}`}>
      <div className="guesses-label">Wrong Guesses</div>
      <div className="guesses-display">
        <span className="guesses-current">{incorrectGuesses}</span>
        <span className="guesses-separator">/</span>
        <span className="guesses-max">{maxGuesses}</span>
      </div>
      <div className="guesses-bar">
        <div
          className="guesses-bar-fill"
          style={{ width: `${(incorrectGuesses / maxGuesses) * 100}%` }}
        />
      </div>
    </div>
  );
}
