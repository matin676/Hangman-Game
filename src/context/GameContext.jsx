import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const STORAGE_KEY = "hangman_stats";

const defaultStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestStreak: 0,
  coins: 100, // Starting balance
  categoryStats: {
    superhero: { played: 0, won: 0 },
    animal: { played: 0, won: 0 },
    movie: { played: 0, won: 0 },
  },
};

const GameContext = createContext();

export function GameProvider({ children }) {
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaultStats;
      const parsed = JSON.parse(saved);
      // Merge with defaultStats to ensure new fields are present
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  });

  // Persist stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error("Failed to save stats:", error);
    }
  }, [stats]);

  const recordGame = useCallback((category, won, reward = 0) => {
    setStats((prev) => {
      const newStreak = won ? prev.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);

      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        coins: prev.coins + (won ? reward : 0),
        categoryStats: {
          ...prev.categoryStats,
          [category]: {
            played: prev.categoryStats[category].played + 1,
            won: won
              ? prev.categoryStats[category].won + 1
              : prev.categoryStats[category].won,
          },
        },
      };
    });
  }, []);

  const earnCoins = useCallback((amount) => {
    setStats((prev) => ({ ...prev, coins: prev.coins + amount }));
  }, []);

  const spendCoins = useCallback((amount) => {
    let success = false;
    setStats((prev) => {
      if (prev.coins >= amount) {
        success = true;
        return { ...prev, coins: prev.coins - amount };
      }
      return prev;
    });
    return success;
  }, []);

  const resetStats = useCallback(() => {
    setStats(defaultStats);
  }, []);

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const value = {
    stats,
    winRate,
    recordGame,
    earnCoins,
    spendCoins,
    resetStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameStats() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameStats must be used within a GameProvider");
  }
  return context;
}
