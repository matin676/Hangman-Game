// Game constants for easy maintenance and scalability
export const GAME_CONFIG = {
  CATEGORIES: ["superhero", "animal", "movie"],
  API_RETRY_COUNT: 3,
  API_RETRY_DELAY_MS: 500,
  BASE_COIN_REWARD: 10,
};

export const DIFFICULTIES = {
  EASY: {
    id: "easy",
    label: "Easy",
    guesses: 8,
    multiplier: 1,
    autoHint: true,
  },
  MEDIUM: {
    id: "medium",
    label: "Medium",
    guesses: 6,
    multiplier: 1.5,
    autoHint: false,
  },
  HARD: {
    id: "hard",
    label: "Hard",
    guesses: 4,
    multiplier: 2.5,
    autoHint: false,
  },
};

export const THEMES = {
  CYBERPUNK: { id: "cyberpunk", label: "Cyberpunk", icon: "🌌" },
  OCEAN: { id: "ocean", label: "Deep Ocean", icon: "🌊" },
  FOREST: { id: "forest", label: "Midnight Forest", icon: "🌲" },
};

export const POWER_UPS = {
  SCAN: {
    id: "scan",
    label: "Scan",
    icon: "🔍",
    cost: 50,
    description: "Reveal 1 letter",
  },
  ELIMINATE: {
    id: "eliminate",
    label: "Eliminate",
    icon: "❌",
    cost: 30,
    description: "Remove 2 wrong keys",
  },
};

export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  GAME: "/main/:category",
};

export const STORAGE_KEYS = {
  STATS: "hangman_stats",
  SOUND_ENABLED: "hangman_sound_enabled",
  THEME: "hangman_theme",
  DIFFICULTY: "hangman_difficulty",
};

export const AUDIO_PATHS = {
  START_GAME: "/audio/startgame.mp3",
  KEYBOARD: "/audio/keyboard.mp3",
  CORRECT: "/audio/correct.mp3",
  WRONG: "/audio/wrong.mp3",
  GAME_WIN: "/audio/gamewin.mp3",
  GAME_OVER: "/audio/gameover.mp3",
  PLAY_AGAIN: "/audio/playagain.mp3",
};

export const CATEGORY_META = {
  superhero: {
    icon: "🦸",
    name: "Superhero",
    description: "Marvel & DC Heroes",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
  },
  animal: {
    icon: "🦁",
    name: "Animal",
    description: "Wildlife Kingdom",
    gradient: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
  },
  movie: {
    icon: "🎬",
    name: "Movie",
    description: "Famous Films",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
  },
};
