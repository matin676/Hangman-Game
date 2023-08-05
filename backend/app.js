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

app.get("/word", async (req, res) => {
  try {
    //Random Word Api Endpoints
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
    randomWord = response.data.word;
    res.json(response.data);
    // console.log(response.data.word);
  } catch (error) {
    res.status(500).json({ error: "Error fetching random word" });
    // console.log(error);
  }
});

app.get("/hint", async (req, res) => {
  try {
    if (!randomWord) {
      return res.status(400).json({ error: "Random word not fetched yet" });
    }
    //Random hint Api Endpoints
    const dictionaryResponse = await axios.get(
      `https://api.wordnik.com/v4/word.json/${randomWord}/definitions`,
      {
        headers: {
          api_key: API_KEY,
        },
        params: {
          sourceDictionaries: "all",
        },
      }
    );
    res.json(dictionaryResponse.data[0].text);
    // console.log(dictionaryResponse.data[0].text);
  } catch (error) {
    res.status(500).json({ error: "Error fetching random word" });
    // console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
