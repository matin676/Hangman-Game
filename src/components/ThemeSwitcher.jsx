import React from "react";
import { createPortal } from "react-dom";
import "../css/themeSwitcher.css";

export default function ThemeSwitcher({
  isOpen,
  onClose,
  currentTheme,
  onThemeSelect,
  themes,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="theme-overlay animate-fade-in" onClick={onClose}>
      <div
        className="theme-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="theme-header">
          <h2 className="theme-title">Select Theme</h2>
          <button className="theme-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="theme-grid">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-card ${currentTheme === t.id ? "active" : ""}`}
              onClick={() => {
                onThemeSelect(t.id);
                onClose();
              }}
            >
              <span className="theme-icon">{t.icon}</span>
              <span className="theme-label">{t.label}</span>
              {currentTheme === t.id && <div className="theme-active-dot" />}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
