'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        const data = [];

        for(let i = 1; i <= 5; i++){
            data.push({
                rank_id: i,
                avatar_id: i,
                created_at: new Date(),
                updated_at: new Date()
            })
        }


        await queryInterface.bulkInsert('rank_has_avatars', data, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('rank_has_avatars', null, {});
    }
};
