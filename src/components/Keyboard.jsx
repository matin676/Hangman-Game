import React, { useMemo } from "react";
import { useSound } from "../hooks/useSound";
import "../css/keyboard.css";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

export default function Keyboard({
  selectedLetters,
  eliminatedLetters = [],
  correctWord = "",
  gameOver,
  onLetterClick,
}) {
  const { playSound } = useSound();

  // Determine if a letter is correct, incorrect, or eliminated
  const getLetterStatus = (letter) => {
    if (eliminatedLetters.includes(letter)) return "eliminated";
    if (!selectedLetters.includes(letter)) return "default";
    if (correctWord.toLowerCase().includes(letter)) return "correct";
    return "incorrect";
  };

  const handleClick = (letter) => {
    if (!selectedLetters.includes(letter) && !gameOver) {
      playSound("/audio/keyboard.mp3");
      onLetterClick(letter);
    }
  };

  // Split letters into rows for QWERTY-like layout
  const rows = useMemo(
    () => [
      LETTERS.slice(0, 10), // q-p (first 10)
      LETTERS.slice(10, 19), // a-l (next 9)
      LETTERS.slice(19, 26), // z-m (last 7)
    ],
    []
  );

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const status = getLetterStatus(letter);
            const isDisabled =
              selectedLetters.includes(letter) ||
              eliminatedLetters.includes(letter) ||
              gameOver;

            return (
              <button
                key={letter}
                className={`key key-${status}`}
                onClick={() => handleClick(letter)}
                disabled={isDisabled}
                aria-label={`Letter ${letter}`}
              >
                <span className="key-letter">{letter}</span>
                <span className="key-ripple"></span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
