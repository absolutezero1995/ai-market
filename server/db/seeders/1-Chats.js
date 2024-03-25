'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "Chats",
            [
                { user_id: 1, title: 'History teacher', createdAt: now, updatedAt: now },
                { user_id: 2, title: 'Broker assistant', createdAt: now, updatedAt: now },
                { user_id: 2, title: 'Joke partner', createdAt: now, updatedAt: now },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Chats", null, {});
    },
};
