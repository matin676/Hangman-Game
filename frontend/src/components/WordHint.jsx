import React from "react";

export default function WordHint({ currentWord, isLetterGuessed, randomHint }) {
  return (
    <>
      <ul className="word-display">
        {currentWord.split("").map((letter, index) => (
          <li
            key={index}
            className={`letter ${isLetterGuessed(letter) ? "guessed" : ""}`}
          >
            <b>{letter.toUpperCase()}</b>
          </li>
        ))}
      </ul>
      <h4 className="hint-text">
        Hint:
        <span className="hint"> {randomHint}</span>
      </h4>
    </>
  );
}
