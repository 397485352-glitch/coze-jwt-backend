import express from 'express';
import cors from 'cors';
import { getJWTToken, COZE_CN_BASE_URL } from '@coze/api';

const app = express();
app.use(cors());

app.get('/api/get-coze-token', async (req, res) => {
  try {
    const tokenResp = await getJWTToken({
      baseURL: COZE_CN_BASE_URL,
      appId: process.env.COZE_APP_ID,
      keyid: process.env.COZE_KEY_ID,
      aud: process.env.COZE_AUD,
      privateKey: process.env.COZE_PRIVATE_KEY
    });
    res.json({ access_token: tokenResp.access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err.message) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`backend run on port ${PORT}`);
});
