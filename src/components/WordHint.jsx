import React from "react";

export default function WordHint({ formattedWord, randomHint }) {
  const letters = formattedWord.split("");

  return (
    <div className="word-hint-container">
      <div className="hint-section">
        <div className="hint-label">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <span>Hint</span>
        </div>
        <p className="hint-text">{randomHint}</p>
      </div>

      <div className="word-display">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`letter-box ${letter !== "_" ? "letter-revealed" : ""}`}
          >
            <span className="letter">{letter === "_" ? "" : letter}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
