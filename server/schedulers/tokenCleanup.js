const cron = require('node-cron');
const { Op } = require('sequelize');
const { RefreshToken } = require('../db/models');

const runCleanupJob = () => {
    cron.schedule('0 0 * * *', async () => {
        const now = new Date();
        await RefreshToken.destroy({
            where: {
                expiryDate: {
                    [Op.lt]: now,
                },
            },
        });
    });
};

module.exports = runCleanupJob;