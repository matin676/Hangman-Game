import React from "react";

export default function Hangmanbox({ incorrectGuesses }) {
  const imageName = `hangman${Math.min(incorrectGuesses, 6)}.png`;

  return (
    <div className="hangman-box">
      <img src={`/images/${imageName}`} draggable="false" alt="hangman-img" />
      <h1>Hangman Game</h1>
    </div>
  );
}
