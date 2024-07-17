import React from "react";

export default function WordHint({
  formattedWord,
  isLetterGuessed,
  randomHint,
}) {
  return (
    <>
      <ul className="word-display">
        {formattedWord.split("").map((letter, index) => (
          <li
            key={index}
            className={`letter ${isLetterGuessed(letter) ? "guessed" : ""}`}
          >
            <b>{isLetterGuessed(letter) ? letter.toUpperCase() : ""}</b>
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
