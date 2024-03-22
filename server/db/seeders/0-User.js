'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        await queryInterface.bulkInsert(
            "Users",
            [
                { id: 0, name: 'edward', email: 'edward@gmail.com', password: '$2a$10$jTSr7FwMtbNbIlweJv.xTu4rTcfHyBMsNHAFgwgTFvKnfGtrFFIXe', createdAt: now, updatedAt: now },
                { id: 1, name: 'max', email: 'max@gmail.com', password: '$2a$10$jTSr7FwMtbNbIlweJv.xTu4rTcfHyBMsNHAFgwgTFvKnfGtrFFIXe', createdAt: now, updatedAt: now },
                { id: 2, name: 'oleg', email: 'oleg@gmail.com', password: '$2a$10$jTSr7FwMtbNbIlweJv.xTu4rTcfHyBMsNHAFgwgTFvKnfGtrFFIXe', createdAt: now, updatedAt: now },
                { id: 3, name: 'sasha', email: 'sasha@gmail.com', password: '$2a$10$jTSr7FwMtbNbIlweJv.xTu4rTcfHyBMsNHAFgwgTFvKnfGtrFFIXe', createdAt: now, updatedAt: now },
                
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
