const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const GROUP_ID = process.env.GROUP_ID;

// Middleware
app.use(cors());
app.use(express.json());

// Маршрут для отримання даних форми
app.post("/submit", async (req, res) => {
  //   console.log(req.body, "req.bodyttttt");
  const { email, text } = req.body;

  if (!email || !text) {
    return res.status(400).send({ error: "Email and message are required" });
  }

  const message = `Нове повідомлення з форми:\nEmail: ${email} \nПовідомлення: ${text}`;

  try {
    // Відправляємо запит до Telegram API
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        // chat_id: CHAT_ID,
        chat_id: GROUP_ID,
        text: message,
      }
    );

    console.log(`Received: Email - ${email}, Description - ${text}`);
    res
      .status(200)
      .send({ success: "Повідомлення успішно надіслано до Telegram!" });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: "Не вдалося надіслати повідомлення до Telegram" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
