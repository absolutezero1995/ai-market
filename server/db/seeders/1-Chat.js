'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "Chats",
            [
                { user_id: 1, title: 'Science assisten', createdAt: now, updatedAt: now },
                { user_id: 1, title: 'Give me a joke', createdAt: now, updatedAt: now },
                { user_id: 1, title: 'History professor', createdAt: now, updatedAt: now },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Chats", null, {});
    },
};
