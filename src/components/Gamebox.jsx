import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import { getWordWithHint } from "../api/randomWord";
import { useGameStats } from "../hooks/useGameStats";
import { useSound } from "../hooks/useSound";
import Hangmanbox from "./Hangmanbox";
import Gamemodal from "./Gamemodal";
import Keyboard from "./Keyboard";
import GuessesText from "./GuessesText";
import WordHint from "./WordHint";
import Header from "./Header";
import Stats from "./Stats";

import {
  GAME_CONFIG,
  DIFFICULTIES,
  STORAGE_KEYS,
  POWER_UPS,
} from "../constants";
import "../css/mainGame.css";

// Use constants but local state can override
const DEFAULT_MAX_GUESSES = 6;

export default function Gamebox({ category }) {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [formattedWord, setFormattedWord] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [randomHint, setRandomHint] = useState("");
  const [hintLoading, setHintLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [hasRecordedGame, setHasRecordedGame] = useState(false);
  const [eliminatedLetters, setEliminatedLetters] = useState([]);

  const { stats, winRate, recordGame, resetStats, spendCoins } = useGameStats();
  const { playSound } = useSound();

  const [difficultyConfig, setDifficultyConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
      return DIFFICULTIES[saved?.toUpperCase()] || DIFFICULTIES.MEDIUM;
    } catch {
      return DIFFICULTIES.MEDIUM;
    }
  });

  const maxGuesses = difficultyConfig.guesses;

  const { data, error, mutate } = useSWR(
    category ? ["randomWordWithHint", category] : null,
    ([, cat]) => getWordWithHint(cat),
    {
      onSuccess: () => setHintLoading(false),
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  const randomWord = data?.word || "Hangman";
  const initialHint = data?.hint || "No definition available, Just Hit 🔄!";

  const formatWord = (word) => word.replace(/\s/g, "").toLowerCase();

  const playerGuessedCorrectly =
    formattedWord.replace(/\s/g, "").toLowerCase() === randomWord.toLowerCase();

  const handleLetterClick = useCallback(
    (clickedLetter) => {
      if (!selectedLetters.includes(clickedLetter) && !gameOver) {
        const updatedLetters = [...selectedLetters, clickedLetter];
        setSelectedLetters(updatedLetters);

        if (randomWord.toLowerCase().includes(clickedLetter)) {
          playSound("/audio/correct.mp3");
          const updatedWord = randomWord
            .split("")
            .map((letter) =>
              updatedLetters.includes(letter.toLowerCase()) ||
              letter === clickedLetter
                ? letter
                : " "
            )
            .join("");
          setFormattedWord(updatedWord.toLowerCase());
        } else {
          playSound("/audio/wrong.mp3");
          setIncorrectGuesses((prevGuesses) => prevGuesses + 1);
        }
      }
    },
    [selectedLetters, randomWord, playSound, gameOver]
  );

  // Physical keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const letter = e.key.toLowerCase();
      if (/^[a-z]$/.test(letter) && !gameOver && gameStarted) {
        handleLetterClick(letter);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleLetterClick, gameOver, gameStarted]);

  // Power-up Handlers
  const handleScan = useCallback(() => {
    if (spendCoins(POWER_UPS.SCAN.cost)) {
      playSound("/audio/keyboard.mp3");
      const unrevealedLetters = randomWord
        .toLowerCase()
        .split("")
        .filter((l) => /^[a-z]$/.test(l) && !selectedLetters.includes(l));

      if (unrevealedLetters.length > 0) {
        const randomLetter =
          unrevealedLetters[
            Math.floor(Math.random() * unrevealedLetters.length)
          ];
        handleLetterClick(randomLetter);
      }
    }
  }, [spendCoins, playSound, randomWord, selectedLetters, handleLetterClick]);

  const handleEliminate = useCallback(() => {
    if (spendCoins(POWER_UPS.ELIMINATE.cost)) {
      playSound("/audio/keyboard.mp3");
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      const wrongLettersAvailable = alphabet.filter(
        (l) =>
          !randomWord.toLowerCase().includes(l) && !selectedLetters.includes(l)
      );

      const toEliminate = wrongLettersAvailable
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      setEliminatedLetters((prev) => [...prev, ...toEliminate]);
    }
  }, [spendCoins, playSound, randomWord, selectedLetters]);

  useEffect(() => {
    if (data) {
      setGameStarted(true);
      setFormattedWord(formatWord(randomWord));
      setRandomHint(initialHint);
    }
  }, [data, randomWord, initialHint]);

  const handlePlayAgain = useCallback(() => {
    setGameStarted(false);
    setFormattedWord("");
    setSelectedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setHintLoading(true);
    setHasRecordedGame(false);
    setEliminatedLetters([]);
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (gameStarted) {
      const updatedWord = randomWord
        .split("")
        .map((letter) =>
          selectedLetters.includes(letter.toLowerCase()) || letter === " "
            ? letter
            : "_"
        )
        .join("");

      setFormattedWord(updatedWord);

      const isWin =
        updatedWord.replace(/\s/g, "").toLowerCase() ===
        randomWord.replace(/\s/g, "").toLowerCase();

      if (isWin) {
        setGameOver(true);
      } else if (incorrectGuesses >= maxGuesses) {
        setTimeout(() => {
          setGameOver(true);
        }, 500);
      }
    }
  }, [gameStarted, randomWord, selectedLetters, incorrectGuesses, maxGuesses]);

  // Record game stats when game ends
  useEffect(() => {
    if (gameOver && !hasRecordedGame) {
      const isWin =
        formattedWord.replace(/\s/g, "").toLowerCase() ===
        randomWord.replace(/\s/g, "").toLowerCase();

      const reward = isWin
        ? Math.round(GAME_CONFIG.BASE_COIN_REWARD * difficultyConfig.multiplier)
        : 0;

      recordGame(category, isWin, reward);
      setHasRecordedGame(true);

      if (isWin) {
        playSound("/audio/gamewin.mp3");
      } else {
        playSound("/audio/gameover.mp3");
      }
    }
  }, [
    gameOver,
    hasRecordedGame,
    formattedWord,
    randomWord,
    recordGame,
    category,
    playSound,
    difficultyConfig,
  ]);

  if (error) {
    return (
      <div className="game-error">
        <div className="error-content glass-card">
          <span className="error-icon">😵</span>
          <h2>Oops! Something went wrong</h2>
          <p>Failed to fetch a word. Please try again.</p>
          <button onClick={handlePlayAgain} className="btn btn-primary">
            Try Again
          </button>
          <Link to="/menu" className="btn btn-ghost">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="game-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Generating word with AI...</p>
          <p className="loading-category">{category}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onStatsClick={() => setShowStats(true)} />

      {showStats && (
        <Stats
          stats={stats}
          winRate={winRate}
          onClose={() => setShowStats(false)}
          onReset={resetStats}
        />
      )}

      {gameOver && (
        <Gamemodal
          correctWord={randomWord}
          playerGuessedCorrectly={playerGuessedCorrectly}
          onPlayAgain={handlePlayAgain}
          gameOver={gameOver}
        />
      )}

      {!gameOver && (
        <div className="game-container">
          <div className="game-layout">
            <div className="game-left">
              <div className="category-badge">
                <span>{category}</span>
              </div>
              <Hangmanbox incorrectGuesses={incorrectGuesses} />
              <button
                className="refresh-btn"
                onClick={handlePlayAgain}
                aria-label="Get new word"
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
                <span>New Word</span>
              </button>
            </div>

            <div className="game-right glass-card">
              <WordHint
                formattedWord={formattedWord}
                randomHint={hintLoading ? "Loading..." : randomHint}
              />
              <GuessesText
                incorrectGuesses={incorrectGuesses}
                maxGuesses={maxGuesses}
              />

              <div className="powerups-container">
                <button
                  className="powerup-btn"
                  onClick={handleScan}
                  disabled={
                    gameOver || (stats.coins || 0) < POWER_UPS.SCAN.cost
                  }
                  title={POWER_UPS.SCAN.description}
                >
                  <span className="powerup-icon">{POWER_UPS.SCAN.icon}</span>
                  <div className="powerup-info">
                    <span className="powerup-label">
                      {POWER_UPS.SCAN.label}
                    </span>
                    <span className="powerup-cost">
                      {POWER_UPS.SCAN.cost} ✨
                    </span>
                  </div>
                </button>

                <button
                  className="powerup-btn"
                  onClick={handleEliminate}
                  disabled={
                    gameOver || (stats.coins || 0) < POWER_UPS.ELIMINATE.cost
                  }
                  title={POWER_UPS.ELIMINATE.description}
                >
                  <span className="powerup-icon">
                    {POWER_UPS.ELIMINATE.icon}
                  </span>
                  <div className="powerup-info">
                    <span className="powerup-label">
                      {POWER_UPS.ELIMINATE.label}
                    </span>
                    <span className="powerup-cost">
                      {POWER_UPS.ELIMINATE.cost} ✨
                    </span>
                  </div>
                </button>
              </div>

              <Keyboard
                selectedLetters={selectedLetters}
                eliminatedLetters={eliminatedLetters}
                correctWord={randomWord}
                gameOver={gameOver}
                onLetterClick={handleLetterClick}
              />

              <p className="keyboard-tip">
                💡 Tip: You can also type on your keyboard!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
