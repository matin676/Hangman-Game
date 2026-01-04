import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "hangman_sound_enabled";

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(soundEnabled));
    } catch (error) {
      console.error("Failed to save sound preference:", error);
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const playSound = useCallback(
    (audioPath) => {
      if (soundEnabled) {
        const audio = new Audio(audioPath);
        audio.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    },
    [soundEnabled]
  );

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
}

export default useSound;
