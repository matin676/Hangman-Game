import React from "react";

const MAX_INCORRECT_GUESSES = 6;

export default function GuessesText({ incorrectGuesses, currentWord }) {
  return (
    <h4 className="guesses-text">
      Incorrect guesses:
      <b className="guess">
        {" "}
        {incorrectGuesses} / {MAX_INCORRECT_GUESSES}
      </b>
      &emsp; Length:
      <b className="guess length"> {currentWord.length}</b>
    </h4>
  );
}
