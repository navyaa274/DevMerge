import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Language map for JDoodle API
const languagesMap = {
  cpp: ["cpp14", "3"],
  c: ["c", "3"],
  java: ["java", "1"],
  python: ["python3", "3"],
  javascript: ["nodejs", "1"],
};

// Post request to create submission
app.post('/api/submission', async (req, res) => {
  try {
    const { language, code, input } = req.body;
    const [languageCode, versionIndex] = languagesMap[language];

    const inputParams = {
      script: code, // User's code
      language: languageCode, // Language code (e.g., python3)
      versionIndex, // Version of the language
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      stdin: input, // The user input
    };

    // Make request to JDoodle API
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      body: JSON.stringify(inputParams),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    // Return the response to the frontend
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
