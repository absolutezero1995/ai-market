require('dotenv/config');
const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  organization: 'org-8tGsmHfqLqCpB8sqPsLNCZiO',
});


router.post('/', async (req, res) => {
  console.log(req.body, 'req.body14');
  const { message, messages } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'assistant', content: messages.length > 0 ? messages.join('\n') : message }],
    });
    // console.log('20', chatCompletion.choices[0].message);

    // Запись в бд истории
    res.send(chatCompletion.choices[0].message);
  } catch (error) {
    console.log('[conversation.route]', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
