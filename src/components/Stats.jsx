import React from "react";
import "../css/stats.css";

export default function Stats({ stats, winRate, onClose, onReset }) {
  return (
    <div className="stats-overlay" onClick={onClose}>
      <div
        className="stats-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="stats-close" onClick={onClose} aria-label="Close">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="stats-title gradient-text">Your Statistics</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.gamesPlayed}</span>
            <span className="stat-label">Games Played</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.gamesWon}</span>
            <span className="stat-label">Games Won</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{winRate}%</span>
            <span className="stat-label">Win Rate</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.currentStreak}</span>
            <span className="stat-label">Current Streak</span>
          </div>
          <div className="stat-card highlight">
            <span className="stat-value">{stats.bestStreak}</span>
            <span className="stat-label">Best Streak</span>
          </div>
        </div>

        <div className="stats-categories">
          <h3>Category Performance</h3>
          <div className="category-stats">
            {Object.entries(stats.categoryStats).map(([category, data]) => (
              <div key={category} className="category-stat">
                <span className="category-name">{category}</span>
                <div className="category-bar-container">
                  <div
                    className="category-bar"
                    style={{
                      width: `${
                        data.played > 0 ? (data.won / data.played) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="category-ratio">
                  {data.won}/{data.played}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="stats-reset btn btn-ghost" onClick={onReset}>
          Reset Statistics
        </button>
      </div>
    </div>
  );
}
