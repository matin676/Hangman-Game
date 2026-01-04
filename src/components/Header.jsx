import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSound } from "../hooks/useSound";
import { useTheme } from "../hooks/useTheme";
import { useGameStats } from "../hooks/useGameStats";
import ThemeSwitcher from "./ThemeSwitcher";
import "../css/header.css";

export default function Header({ onStatsClick }) {
  const { soundEnabled, toggleSound } = useSound();
  const { theme, setTheme, themes } = useTheme();
  const { stats } = useGameStats();
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="header">
      <div className="header-content">
        {!isHomePage && (
          <Link to="/" className="header-logo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 12l6-6M3 12l6 6" />
            </svg>
            <span>Home</span>
          </Link>
        )}

        <div className="header-actions">
          <div className="coin-display animate-fade-in">
            <span className="coin-icon">✨</span>
            <span className="coin-amount">{stats.coins}</span>
          </div>

          <button
            className="header-btn"
            onClick={() => setIsThemeOpen(true)}
            aria-label="Change Theme"
          >
            <span style={{ fontSize: "18px" }}>
              {themes.find((t) => t.id === theme)?.icon || "🎨"}
            </span>
          </button>

          <button
            className="header-btn"
            onClick={onStatsClick}
            aria-label="View Statistics"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </button>

          <button
            className="header-btn"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute Sound" : "Unmute Sound"}
          >
            {soundEnabled ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <ThemeSwitcher
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        currentTheme={theme}
        onThemeSelect={setTheme}
        themes={themes}
      />
    </header>
  );
}
