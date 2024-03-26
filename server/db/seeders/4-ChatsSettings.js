'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const chatSettings = [
            {
                chat_id: 1,
                version: 'gpt-3.5-turbo',
                roleS: 'system',
                roleU: 'user',
                roleA: 'assistant',
                c   ,
                temperature: 0.8,
                n: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                chat_id: 2,
                version: 'gpt-3.5-turbo',
                roleS: 'system',
                roleU: 'user',
                roleA: 'assistant',
                content: 'You are a knowledgeable assistant.',
                temperature: 0.7,
                n: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            // добавьте остальные боты здесь
        ];

        return queryInterface.bulkInsert('ChatSettings', chatSettings, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ChatSettings', null, {});
    }
};