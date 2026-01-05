# 🎮 Advanced AI-Powered Hangman

A premium, feature-rich Hangman word guessing game built with **React 19**, **Vite**, and **Google Gemini AI**.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square&logo=vite)
![Gemini](https://img.shields.io/badge/AI-Gemini_2.0-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🤖 AI-Powered Vocabulary

- **Dynamic Word Generation**: Words and context-aware hints generated in real-time by Google Gemini AI.
- **Categorized Challenges**: Choose from **Superhero**, **Animal**, and **Movie** categories.
- **Fail-safe Logic**: Built-in fallback word library ensures uninterrupted gameplay even without an API connection.

### ⚙️ RPG-Style Progression

- **Difficulty Modes**:
  - **Easy**: 8 guesses | 1.0x Rewards.
  - **Medium**: 6 guesses | 1.5x Rewards.
  - **Hard**: 4 guesses | 2.5x Rewards.
- **✨ Glow Coins**: Earn coins by winning games and spend them on strategic power-ups.
- **Power-up System**:
  - **Scan (50 ✨)**: Automatically reveals a hidden letter.
  - **Eliminate (30 ✨)**: Disables two incorrect letters from the keyboard.

### 🎨 Immersive Experience

- **Dynamic Themes**: Switch between **Cyberpunk**, **Deep Ocean**, and **Midnight Forest** styles.
- **Smooth Animations**: Glassmorphism UI with micro-interactions and transitions.
- **Soundscape**: Immersive audio feedback for every action (win, loss, power-up).

### 📊 Persistent Progress

- **Unified Stats**: Real-time synchronization of wins, streaks, and coins using React Context.
- **Local Persistence**: All stats, difficulty settings, and themes are saved to `localStorage`.

## 🚀 Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/matin676/Hangman-Game.git
cd Hangman-Game
npm install

# 2. Setup API Key
echo "VITE_API_KEY=your_gemini_api_key_here" > .env

# 3. Launch
npm run dev
```

> [!TIP]
> Get your API key for free from [Google AI Studio](https://aistudio.google.com/app/apikey).

## 🛠️ Technical Implementation

- **State Management**: Centralized `GameContext` (React Context API) for global state synchronization.
- **Navigation**: `React Router 7` with Portal-based overlays for high-performance UI components.
- **Data Hooking**: `SWR` for intelligent word fetching and revalidation.
- **Architecture**: Modular component-based design with custom hooks for audio and statistics.

## 📄 License

MIT © Matin Imam
