import React, { useRef, useEffect } from "react";

export default function Gamemodal({
  correctWord,
  playerGuessedCorrectly,
  onPlayAgain,
  gameOver,
}) {
  const message = playerGuessedCorrectly ? "Congrats!" : "Game Over!";
  const message2 = playerGuessedCorrectly
    ? "You found the word:"
    : "The correct word was:";
  const imageUrl = playerGuessedCorrectly
    ? "/images/victory.gif"
    : "/images/lost.gif";

  const playAgainButtonRef = useRef(null);
  const clickAudioRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  const handlePlayAgainClick = () => {
    onPlayAgain();
    playClickSound();
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.play();
    }
  };

  const playOutcomeSound = (playerGuessedCorrectly) => {
    if (playerGuessedCorrectly) {
      if (correctSoundRef.current) {
        correctSoundRef.current.play();
      }
    } else {
      if (wrongSoundRef.current) {
        wrongSoundRef.current.play();
      }
    }
  };

  useEffect(() => {
    clickAudioRef.current = new Audio("/audio/playagain.mp3");
    correctSoundRef.current = new Audio("/audio/gamewin.mp3");
    wrongSoundRef.current = new Audio("/audio/gameover.mp3");
  }, []);

  useEffect(() => {
    if (gameOver) {
      playOutcomeSound(playerGuessedCorrectly);
    }
  }, [gameOver, playerGuessedCorrectly]);

  return (
    <div className={`game-modal ${gameOver ? "show" : ""}`}>
      <div className="content">
        <img src={imageUrl} alt="alt" />
        <h4>{message}</h4>
        <p>
          {message2} <b className="correctWord">{correctWord}</b>
        </p>
        <button
          className="play-again"
          onClick={handlePlayAgainClick}
          ref={playAgainButtonRef}
        >
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}
