'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "Users",
            [
                { name: '123', email: '123@123', password: '$2a$10$TrIOiwCZ/Ixj5wTip5EHbubQH9LNn8yS/wHXcRZUaMp6ZE/nC8PlW', createdAt: now, updatedAt: now },
                { name: '11', email: '11@11', password: '$2a$10$N3kVZ.j3V0AYrXcd4khj7OU5Cuq0NHje9.1xIUE.0CFd72WJDk00a', createdAt: now, updatedAt: now },

            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
