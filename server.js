const express = require('express');
const { getJWTToken } = require('@coze/node-sdk');
const app = express();
const port = process.env.PORT || 3000;

// 跨域处理
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// 托管前端页面 index.html
app.use(express.static('./'));

app.get('/token', async (req, res) => {
  try {
    const rawKey = process.env.COZE_PRIVATE_KEY;
    // 将环境变量内字面 \n 转为真实换行符，解决Render丢失换行问题
    const privateKey = rawKey.replace(/\\n/g, '\n');

    // 调试日志，上线后可以删除
    console.log("key preview:", JSON.stringify(privateKey.substring(0, 60)));

    const tokenResp = await getJWTToken({
      appid: process.env.COZE_APP_ID,
      keyid: process.env.COZE_KEY_ID,
      aud: process.env.COZE_AUD,
      privateKey: privateKey
    });
    res.json(tokenResp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
