const router = require('express').Router();
const { ChatHistory } = require('../../db/models');

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ChatHistory.destroy({ where: { id } });
        res.sendStatus(204); // Отправляем статус 204 No Content, чтобы указать успешное выполнение удаления
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); // Отправляем статус 500 Internal Server Error в случае ошибки
    }
});

module.exports = router;
