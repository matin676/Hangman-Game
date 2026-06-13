import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("VITE_API_KEY is not set! Check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Cache for used words to prevent duplicates
const usedWords = new Set();

// Fallback words in case API fails
const fallbackWords = {
  superhero: [
    { word: "spiderman", hint: "A web-slinging hero from Marvel Comics" },
    { word: "batman", hint: "The Dark Knight of Gotham City" },
    { word: "superman", hint: "The Man of Steel from Krypton" },
    { word: "wolverine", hint: "X-Men member with adamantium claws" },
    { word: "ironman", hint: "Genius billionaire in a powered suit" },
  ],
  animal: [
    { word: "elephant", hint: "The largest land animal with a trunk" },
    { word: "dolphin", hint: "Highly intelligent marine mammal" },
    { word: "penguin", hint: "Flightless bird that lives in cold climates" },
    { word: "kangaroo", hint: "Australian marsupial that hops" },
    { word: "giraffe", hint: "Tallest living animal with a long neck" },
  ],
  movie: [
    { word: "inception", hint: "Christopher Nolan's dream heist film" },
    { word: "avatar", hint: "James Cameron's sci-fi epic on Pandora" },
    { word: "titanic", hint: "Epic romance set on a doomed ship" },
    { word: "gladiator", hint: "Ridley Scott's Roman epic with Russell Crowe" },
    { word: "interstellar", hint: "Space exploration to save humanity" },
  ],
};

// Get random fallback word
const getFallbackWord = (category) => {
  const words = fallbackWords[category] || fallbackWords.superhero;
  const available = words.filter((w) => !usedWords.has(w.word));

  if (available.length === 0) {
    // Clear used words if all are used
    words.forEach((w) => usedWords.delete(w.word));
    return words[Math.floor(Math.random() * words.length)];
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedWords.add(selected.word);
  return selected;
};

// Retry with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = Math.pow(2, attempt) * 500; // 500ms, 1s, 2s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Fetch word from Gemini API
const fetchWordFromAPI = async (category) => {
  const prompts = {
    superhero:
      "Provide a random superhero name from Marvel or DC comics. The name MUST be a single word with only alphabetic characters (no hyphens, numbers, spaces, or special characters). For example, use 'spiderman' instead of 'spider-man'. Also provide a hint. Format: 'Word: <superhero>, Hint: <hint>'.",
    animal:
      "Provide a random animal name. The name MUST be a single word with only alphabetic characters (no hyphens, numbers, spaces, or special characters). Also provide a hint. Format: 'Word: <animal>, Hint: <hint>'.",
    movie:
      "Provide a random well-known movie name. The name MUST be a single word with only alphabetic characters (no hyphens, numbers, spaces, or special characters). If the movie has numbers, spell them out (e.g., 'sawfive' for 'Saw 5'). Also provide a hint. Format: 'Word: <movie>, Hint: <hint>'.",
  };

  const prompt = prompts[category] || prompts.superhero;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  const wordMatch = text.match(/Word:\s*([^,]+)/);
  const hintMatch = text.match(/Hint:\s*(.+)/);

  let word = wordMatch ? wordMatch[1].trim() : "";
  const hint = hintMatch ? hintMatch[1].trim() : "";

  // Clean the word: convert numbers to words, then keep only letters
  const numberWords = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four",
    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
    10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
  };
  word = word.toLowerCase();
  word = word.replace(/\d+/g, (match) => numberWords[parseInt(match)] || match);
  word = word.replace(/[^a-z]/g, "");

  if (!word || usedWords.has(word)) {
    throw new Error("Invalid or duplicate word");
  }

  usedWords.add(word);
  return { word, hint };
};

// Main function to get word with hint
export const getWordWithHint = async (category) => {
  try {
    // Try API with retry logic
    const result = await retryWithBackoff(() => fetchWordFromAPI(category));
    return result;
  } catch (error) {
    console.warn("API failed, using fallback:", error.message);
    // Fall back to local words
    return getFallbackWord(category);
  }
};

export default getWordWithHint;
