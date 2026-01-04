import { useState, useEffect, useCallback } from "react";
import { THEMES, STORAGE_KEYS } from "../constants";

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved || THEMES.CYBERPUNK.id;
    } catch {
      return THEMES.CYBERPUNK.id;
    }
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }, []);

  useEffect(() => {
    // Remove all theme classes
    Object.values(THEMES).forEach((t) => {
      document.body.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return {
    theme,
    setTheme,
    themes: Object.values(THEMES),
  };
}

export default useTheme;
