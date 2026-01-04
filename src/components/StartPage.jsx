import React from "react";
import { Link } from "react-router-dom";
import { useSound } from "../hooks/useSound";
import "../css/startPage.css";

export default function StartPage() {
  const { playSound } = useSound();

  const handlePlayButtonClick = () => {
    playSound("/audio/startgame.mp3");
  };

  return (
    <div className="start-page">
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="start-content animate-fade-in-up">
        <div className="title-container">
          <h1 className="game-title">
            <span className="title-letter" style={{ animationDelay: "0s" }}>
              H
            </span>
            <span className="title-letter" style={{ animationDelay: "0.1s" }}>
              A
            </span>
            <span className="title-letter" style={{ animationDelay: "0.2s" }}>
              N
            </span>
            <span className="title-letter" style={{ animationDelay: "0.3s" }}>
              G
            </span>
            <span className="title-letter" style={{ animationDelay: "0.4s" }}>
              M
            </span>
            <span className="title-letter" style={{ animationDelay: "0.5s" }}>
              A
            </span>
            <span className="title-letter" style={{ animationDelay: "0.6s" }}>
              N
            </span>
          </h1>
          <p className="game-subtitle">Guess the word before it's too late</p>
        </div>

        <Link
          to="/menu"
          className="play-button"
          onClick={handlePlayButtonClick}
        >
          <span className="play-button-bg"></span>
          <span className="play-button-content">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Now</span>
          </span>
        </Link>

        <div className="start-features">
          <div className="feature">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>3 Categories</span>
          </div>
          <div className="feature">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>AI Powered</span>
          </div>
          <div className="feature">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 20V10M18 20V4M6 20v-4" />
            </svg>
            <span>Track Stats</span>
          </div>
        </div>
      </div>

      <footer className="start-footer">
        <p>Built with React + Gemini AI</p>
      </footer>
    </div>
  );
}
