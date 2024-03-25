const express = require('express');
const OpenAI = require('openai');
const { ChatHistory } = require('../../db/models');

const router = express.Router();

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  organization: 'org-8tGsmHfqLqCpB8sqPsLNCZiO',
});

router.post('/', async (req, res) => {
  const { chat_id, request } = req.body;

  try {
    const chatHistories = await ChatHistory.findAll({ where: { chat_id } });
    console.log(chatHistories)
    let concatenatedHistory = '';
    if (chatHistories !== undefined &&  chatHistories.length > 0) {
      concatenatedHistory = chatHistories.reduce((acc, item) => acc + String(`${item.request}? \n твой ответ: ${item.responce}.`), '');
    } else {
      concatenatedHistory = request;
    }

    // console.log(concatenatedHistory, '!!!!!!!!!!!!!!');
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'assistant', content: concatenatedHistory }],
    });

    // console.log(request , chatCompletion.choices[0].message.content, '@@@@@@@@@@@@@@@@@@@@@')
    const newChatHistory = { chat_id, request, responce: chatCompletion.choices[0].message.content };
    const historyItem = await ChatHistory.create(newChatHistory);

    console.log(historyItem.responce, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    res.json(historyItem.responce);
  } catch (error) { 
    console.log('[conversation.route]', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;