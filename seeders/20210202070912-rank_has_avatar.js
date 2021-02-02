'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        const data = []

        data.push({
            rank_id: 1,
            avatar_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        })

        data.push({
            rank_id: 2,
            avatar_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        })

        data.push({
            rank_id: 2,
            avatar_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        })

        data.push({
            rank_id: 3,
            avatar_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        })

        data.push({
            rank_id: 3,
            avatar_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        })

        data.push({
            rank_id: 3,
            avatar_id: 3,
            created_at: new Date(),
            updated_at: new Date()
        })


        await queryInterface.bulkInsert('rank_has_avatars', data, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('rank_has_avatars', null, {});
    }
};
