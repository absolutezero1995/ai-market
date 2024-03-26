'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "ChatHistories",
            [
                { chat_id: 1, request: 'Привет, расскажи про войну во Вьетнаме?', responce: 'Война во Вьетнаме (1955–1975) развернулась между коммунистическим Севером и антикоммунистическим Югом. США вмешались на стороне Юга, применяя массированные авиаудары и военные операции. Война привела к огромным человеческим и материальным потерям. Завершилась победой Севера в 1975 году, объединением страны и уходом американских войск. Конфликт оставил сложное наследие, подчеркивая сложности ведения военных действий в условиях гражданской войны и вызывая широкие обсуждения в мире.', createdAt: now, updatedAt: now },
                { chat_id: 1, request: "Сколько она длилась?", responce: 'Война во Вьетнаме длилась около 20 лет, с 1955 по 1975 год.', createdAt: now, updatedAt: now },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ChatHistories", null, {});
    },
};
