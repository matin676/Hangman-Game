import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { getWordWithHint } from "../api/randomWord";
import Hangmanbox from "./Hangmanbox";
import Gamemodal from "./Gamemodal";
import Load from "./Load";
import Keyboard from "./Keyboard";
import GuessesText from "./GuessesText";
import WordHint from "./WordHint";

import "../css/mainGame.css";
import Error from "./Error";

const MAX_INCORRECT_GUESSES = 6;

export default function Gamebox({ category }) {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [formattedWord, setFormattedWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [randomHint, setRandomHint] = useState("");
  const [hintLoading, setHintLoading] = useState(true);

  const fetcher = () => getWordWithHint(category).then((data) => data);

  const { data, error, mutate } = useSWR(
    ["randomWordWithHint", category],
    fetcher,
    { onSuccess: () => setHintLoading(false) }
  );

  const randomWord = data?.word || "Hangman";
  const initialHint = data?.hint || "No definition available, Just Hit 🔄!";

  const formatWord = (word) => word.replace(/\s/g, "").toLowerCase();

  const playerGuessedCorrectly =
    formattedWord.replace(/\s/g, "").toLowerCase() === randomWord.toLowerCase();

  const isLetterGuessed = (letter) =>
    selectedLetters.includes(letter) || !gameStarted;

  const handleLetterClick = (clickedLetter) => {
    // console.log("RandomWord:", randomWord);
    // console.log("Clicked Letter:", clickedLetter);
    // console.log("Selected Letters:", selectedLetters);

    if (!selectedLetters.includes(clickedLetter)) {
      const updatedLetters = [...selectedLetters, clickedLetter];
      setSelectedLetters(updatedLetters);

      if (randomWord.includes(clickedLetter)) {
        const updatedWord = randomWord
          .split("")
          .map((letter) =>
            updatedLetters.includes(letter) || letter === clickedLetter
              ? letter
              : " "
          )
          .join("");
        setFormattedWord(updatedWord.toLowerCase());
      } else {
        setIncorrectGuesses((prevGuesses) => prevGuesses + 1);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setGameStarted(true);
      setFormattedWord(formatWord(randomWord));
      setRandomHint(initialHint);
    }
  }, [data, randomWord, initialHint]);

  const handlePlayAgain = () => {
    setGameStarted(false);
    setFormattedWord("");
    setSelectedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setHintLoading(true);
    mutate();
  };

  const handleLoadClick = () => {
    handlePlayAgain();
  };

  useEffect(() => {
    if (gameStarted) {
      const updatedWord = randomWord
        .split("")
        .map((letter) =>
          selectedLetters.includes(letter) || letter === " " ? letter : "_"
        )
        .join("");

      setFormattedWord(updatedWord);

      const playerGuessedCorrectly =
        updatedWord.replace(/\s/g, "").toLowerCase() ===
        randomWord.replace(/\s/g, "").toLowerCase();

      if (playerGuessedCorrectly) {
        setGameOver(true);
      } else if (incorrectGuesses >= MAX_INCORRECT_GUESSES) {
        setTimeout(() => {
          setGameOver(true);
        }, 500);
      }
    }
  }, [gameStarted, randomWord, selectedLetters, incorrectGuesses]);

  if (error) {
    console.error("Error fetching random word or hint:", error);
    return (
      <center>
        <b>
          <i>Try reloading!!</i>
        </b>
        <Error />
      </center>
    );
  }

  if (!data) {
    return (
      <div class="loader-container">
        <div class="flipping-cards">
          <div class="card">l</div>
          <div class="card">o</div>
          <div class="card">a</div>
          <div class="card">d</div>
          <div class="card">i</div>
          <div class="card">n</div>
          <div class="card">g</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {gameOver && (
        <Gamemodal
          correctWord={randomWord}
          playerGuessedCorrectly={playerGuessedCorrectly}
          onPlayAgain={handlePlayAgain}
          gameOver={gameOver}
        />
      )}
      {!gameOver && (
        <div className="container">
          <Load onLoadClick={handleLoadClick} />
          <Hangmanbox incorrectGuesses={incorrectGuesses} />
          <div className="game-box">
            <WordHint
              formattedWord={formattedWord}
              isLetterGuessed={isLetterGuessed}
              randomHint={hintLoading ? "Loading..." : randomHint}
            />
            <GuessesText
              incorrectGuesses={incorrectGuesses}
              currentWord={formattedWord}
            />
            <Keyboard
              selectedLetters={selectedLetters}
              gameOver={gameOver}
              onLetterClick={handleLetterClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
