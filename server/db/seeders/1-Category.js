'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "Categories",
            [
                {category: 'Conversation', createdAt: now, updatedAt: now },
                {category: 'Image', createdAt: now, updatedAt: now },
                {category: 'Video', createdAt: now, updatedAt: now },
                {category: 'Audio', createdAt: now, updatedAt: now },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
