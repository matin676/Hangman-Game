const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const serve = require("serve-static");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const frontPath = path.join(__dirname, "../frontend/public");
app.use(serve(frontPath));

const API_KEY = process.env.WORDNIK_API_KEY;

app.get("/wordHint", async (req, res) => {
  try {
    // Random Word
    const response = await axios.get(
      "https://api.wordnik.com/v4/words.json/randomWord",
      {
        headers: {
          api_key: API_KEY,
        },
        params: {
          hasDictionaryDef: "true",
        },
      }
    );

    const randomWord = response.data.word;
    const cleanedWord = randomWord.toLowerCase().replace(/[^a-z]/g, "");
    console.log(cleanedWord);

    // Hint
    const dictionaryResponse = await axios.get(
      `https://api.wordnik.com/v4/word.json/${cleanedWord}/definitions`,
      {
        headers: {
          api_key: API_KEY,
        },
        params: {
          sourceDictionaries: "all",
        },
      }
    );

    let hint = "No definition available, Just Hit 🔃!";
    if (dictionaryResponse.data.length > 0) {
      const definition = dictionaryResponse.data[0].text;
      hint = definition.replace(/<\/?[^>]+(>|$)/g, "");
    }
    console.log(hint);

    const responseWithWordAndHint = {
      word: cleanedWord,
      hint: hint,
    };

    res.json(responseWithWordAndHint);
  } catch (error) {
    res.status(500).json({ error: "Error fetching random word or hint" });
    console.error(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
