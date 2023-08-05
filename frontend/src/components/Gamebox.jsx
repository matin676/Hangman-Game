import React, { useEffect, useState } from "react";
import axios from "axios";

import Hangmanbox from "./Hangmanbox";
import Gamemodal from "./Gamemodal";
import Load from "./Load";
import Keyboard from "./Keyboard";
import GuessesText from "./GuessesText";
import WordHint from "./WordHint";

const MAX_INCORRECT_GUESSES = 6;

export default function Gamebox() {
  const [randomHint, setRandomHint] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const playerGuessedCorrectly =
    currentWord.replace(/\s/g, "").toLowerCase() === randomWord.toLowerCase();

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
        setCurrentWord(updatedWord.toLowerCase());
      } else {
        setIncorrectGuesses((prevGuesses) => prevGuesses + 1);
      }
    }
  };

  const fetchWordAndHint = async () => {
    try {
      //Fetching random word from backend
      setRandomHint("Loading...");
      const response = await axios.get("http://localhost:5000/word");
      const word = response.data.word.toLowerCase();
      const cleanedWord = word.replace(/[^a-z]/g, "");
      console.log(cleanedWord);

      //Fetching definition(hint) of fetched random word from backend
      const dictionaryResponse = await axios.get("http://localhost:5000/hint");
      setRandomWord(cleanedWord);

      let hint = "No definition available, Just Hit 🔃!";
      if (dictionaryResponse.data.length > 0) {
        const definition = dictionaryResponse.data;
        hint = definition.replace(/<\/?[^>]+(>|$)/g, "");
      }
      console.log(hint);
      setRandomHint(hint);
      setGameStarted(true);
      setCurrentWord(cleanedWord.replace(/\s/g, " ").toLowerCase());
    } catch (error) {
      console.error("Error fetching random word or definition:", error);
      // Setting a default word and hint in case of an error
      setRandomWord("hangman");
      setRandomHint("No definition available, Just Hit 🔃!");
      setGameStarted(true);
      setCurrentWord("hangman".replace(/\s/g, " "));
    }
  };

  const handlePlayAgain = () => {
    setGameStarted(false);
    setCurrentWord("");
    setSelectedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    fetchWordAndHint();
  };

  const handleLoadClick = () => {
    handlePlayAgain();
  };

  useEffect(() => {
    fetchWordAndHint();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const updatedWord = randomWord
        .split("")
        .map((letter) => (selectedLetters.includes(letter) ? letter : " "))
        .join("");

      setCurrentWord(updatedWord.toLowerCase());

      const playerGuessedCorrectly =
        updatedWord.replace(/\s/g, "").toLowerCase() ===
        randomWord.toLowerCase();

      if (playerGuessedCorrectly) {
        setGameOver(true);
      } else if (incorrectGuesses >= MAX_INCORRECT_GUESSES) {
        setTimeout(() => {
          setGameOver(true);
        }, 500);
      }
    }
  }, [gameStarted, randomWord, selectedLetters, incorrectGuesses]);

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
              currentWord={currentWord}
              isLetterGuessed={isLetterGuessed}
              randomHint={randomHint}
            />
            <GuessesText
              incorrectGuesses={incorrectGuesses}
              currentWord={currentWord}
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
