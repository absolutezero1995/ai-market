const express = require('express');
const OpenAI = require('openai');
const { ChatHistory } = require('../../db/models');

const router = express.Router();

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  organization: 'org-8tGsmHfqLqCpB8sqPsLNCZiO',
});

router.post('/', async (req, res) => {
  const { chat_id, request } = req.body; // Получение данных из тела запроса

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'assistant', content: request }],
    });

    // console.log('20', chatCompletion.choices[0].message);

    // Создание записи в базе данных ChatHistory
    const historyItem = await ChatHistory.create({ chat_id, request, responce: chatCompletion.choices[0].message.content });
    console.log(historyItem, 'historyItem')
    res.send(chatCompletion.choices[0].message);
  } catch (error) {
    console.log('[conversation.route]', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
