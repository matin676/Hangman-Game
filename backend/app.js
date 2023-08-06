const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
let randomWord = null;

app.get("/wordHint", async (req, res) => {
  try {
    // Fetch Random Word from API
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

    // Fetch Hint for the Random Word from API
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
