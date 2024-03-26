// const router = require('express').Router();

// router.post('/', async (req, res) => {
//     const { message, content } = req.body;
//     console.log('vopros: ', message, 'otvet: ', content, " - eto save");
// });

// module.exports = router;

const router = require('express').Router();

router.post('/', async (req, res) => {
    const { id, request } = req.body;
    console.log(id, request);
});

module.exports = router;

// const { ChatHistory } = require('../../db/models')
// const { Category } = require('../../db/models');
// const { Chat } = require('../../db/models');
// const verifyToken = require('../../middleware/verifyToken');

// router.post('/', verifyToken, async (req, res) => {
//     try {
//         const {category_id, chat_id,  message, content} = req.body;

//         console.log(category_id , " - index")
//         console.log(req.user, 'req.token7');
//         const authorizationHeader = req.headers.authorization;
//         console.log(authorizationHeader, 'authorizationHeader9');
//         let token;
//         if (authorizationHeader) {
//             token = authorizationHeader.split(' ')[1];
//         }
//         console.log(token, 'token17')

//         const chat_exist = await Chat.findOne({chat_id});
//         if(chat_exist){
//             await ChatHistory.create({chat_id: chat_id, request: message, responce: content})
//         } else{
//             await Chat.create({user_id: req.user.userId, category_id: category_id, title: message})
//         }
//         console.log(chatsList, ' - chatsList')
//         res.send(chatsList)
//     } catch (error) {
//         console.log(error)
//     }
// });

module.exports = router;


