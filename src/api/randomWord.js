const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set to keep track of recently used words
const usedWords = new Set();

const getWordWithHint = async (category) => {
  let word = "";
  let hint = "";

  for (let attempt = 0; attempt < 5; attempt++) {
    let prompt = "";

    if (category === "superhero") {
      prompt =
        "Provide a random superhero name from Marvel comics or DC comics and a hint for it. Format the response as 'Word: <superhero>, Hint: <hint>'.";
    } else if (category === "animal") {
      prompt =
        "Provide a random animal name and a hint for it. Format the response as 'Word: <animal>, Hint: <hint>'.";
    } else if (category === "movie") {
      prompt =
        "Provide a random movie name from a well-known list of movies along with a hint. Format the response as 'Word: <movie>, Hint: <hint>'.";
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const wordMatch = text.match(/Word:\s*([^,]+)/);
    const hintMatch = text.match(/Hint:\s*(.+)/);

    word = wordMatch ? wordMatch[1].trim() : "";
    hint = hintMatch ? hintMatch[1].trim() : "";

    // Remove non-alphanumeric characters and convert to lowercase
    word = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").toLowerCase();
    // Remove spaces to treat the name as a single string
    word = word.replace(/\s+/g, "");

    if (!usedWords.has(word)) {
      usedWords.add(word);
      break;
    }

    word = "";
  }

  if (!word) {
    word = category === "superhero" ? "Hangman" : "Hangman";
    hint = "No definition available, Just Hit 🔄!";
  }

  return { word, hint };
};

export { getWordWithHint };
