'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "ChatSettings",
            [
                { chat_id: 1, role: 'You are the best history teacher, you are expert in second world war', version: 'gpt-3.5-turbo', temperature: 0.7, createdAt: now, updatedAt: now },
                { chat_id: 2, role: 'You are a language expert, focusing on English literature', version: 'gpt-3.5-turbo', temperature: 0.7, createdAt: now, updatedAt: now },
                { chat_id: 3, role: 'You are a science guru, particularly knowledgeable in physics', version: 'gpt-3.5-turbo', temperature: 0.7, createdAt: now, updatedAt: now },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ChatSettings", null, {});
    },
};
