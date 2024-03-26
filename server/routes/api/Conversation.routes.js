const express = require('express');
const OpenAI = require('openai');
const { ChatHistory, ChatSetting } = require('../../db/models');

const router = express.Router();

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  organization: 'org-8tGsmHfqLqCpB8sqPsLNCZiO',
});

router.post('/', async (req, res) => {
  const { id, request } = req.body;
  try {
    const chatHistories = await ChatHistory.findAll({ where: { chat_id: id } });
    const chatSettings = await ChatSetting.findOne({ where: { chat_id: id } });
    let messages = [];

    if (chatHistories && chatHistories.length > 0) {
      messages = chatHistories.map((history) => ({
        role: 'system',
        content: history.responce,
      }));
    }
    console.log(chatSettings, 'chatSettings 25')
    messages.push({ role: 'user', content: request });

    let model = 'gpt-3.5-turbo';
    let temperature = 0.8;

    if (chatSettings) {
      model = chatSettings.version;
      temperature = chatSettings.temperature;
    }

    const chatCompletion = await openai.chat.completions.create({
      model,
      messages,
      temperature,  
    });

    const responce = chatCompletion.choices[0].message.content;
    const newChatHistory = { chat_id: id, request, responce };
    await ChatHistory.create(newChatHistory);
    
    res.json(responce);
  } catch (error) { 
    console.log('[conversation.route]', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;