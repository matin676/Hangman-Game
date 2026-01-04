import React, { useRef, useEffect } from "react";
import { useSound } from "../hooks/useSound";
import "../css/gamemodal.css";

export default function Gamemodal({
  correctWord,
  playerGuessedCorrectly,
  onPlayAgain,
  gameOver,
}) {
  const message = playerGuessedCorrectly ? "Victory!" : "Game Over";
  const message2 = playerGuessedCorrectly
    ? "You guessed the word:"
    : "The correct word was:";

  const playAgainButtonRef = useRef(null);
  const { playSound } = useSound();

  const handlePlayAgainClick = () => {
    playSound("/audio/playagain.mp3");
    onPlayAgain();
  };

  useEffect(() => {
    if (gameOver) {
      if (playerGuessedCorrectly) {
        playSound("/audio/gamewin.mp3");
      } else {
        playSound("/audio/gameover.mp3");
      }
    }
  }, [gameOver, playerGuessedCorrectly, playSound]);

  return (
    <div className={`modal-overlay ${gameOver ? "show" : ""}`}>
      <div
        className={`modal-content ${
          playerGuessedCorrectly ? "modal-win" : "modal-lose"
        }`}
      >
        {/* Confetti for win */}
        {playerGuessedCorrectly && (
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  "--delay": `${Math.random() * 0.5}s`,
                  "--x": `${Math.random() * 100}%`,
                  "--rotation": `${Math.random() * 360}deg`,
                }}
              />
            ))}
          </div>
        )}

        <div
          className={`modal-icon ${
            playerGuessedCorrectly ? "" : "animate-shake"
          }`}
        >
          {playerGuessedCorrectly ? "🎉" : "💀"}
        </div>

        <h2
          className={`modal-title ${
            playerGuessedCorrectly ? "gradient-text" : ""
          }`}
        >
          {message}
        </h2>

        <p className="modal-message">
          {message2}
          <span className="modal-word">{correctWord}</span>
        </p>

        <div className="modal-actions">
          <button
            className="btn btn-primary modal-btn"
            onClick={handlePlayAgainClick}
            ref={playAgainButtonRef}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
