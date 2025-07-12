const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: process.env.DEEPL_API_KEY,
        text: text,
        target_lang: targetLang.toUpperCase() // 'FR' or 'EN'
      }
    });

    const translation = response.data.translations[0].text;
    res.json({ translation });
  } catch (err) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(port, () => {
  console.log(`Translation server running on http://localhost:${port}`);
});
