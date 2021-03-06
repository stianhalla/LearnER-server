/**
 * Migrasjonsfil som håndterer forhold mellom entiteter.
 *
 * Viktig att dette er den siste migration fila (kjøres til slutt),
 * Lages nye migrasjoner etter 20 januar 2022, skal denne fila lages på nytt (kopieres):
 *   - Kopier innhold på fila
 *   - Slett denne fila
 *   - Bruk komandoen: sequelize migration:generate --name add-associations
 *   - Lim inn i den nye fila
 * */
const { defaultValue } = require('../config/types')

'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Exercise belongsTo User || User hasMany Exercises
        await queryInterface.addColumn(
            'exercises', // Tabell som skal ha fremmednøkkel
            'author_id',   // Navn på fremmednøkkel
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // Tabell som fremmednøkkel refererer til
                    key: 'id'      // Primærnøkkel som fremmednøkkel refererer til
                },
                allowNull: true,
                onDelete: 'SET NULL'
            }).then(async () => {
            // 2. Exercise belongsTo diffeculty_level || diffeculty_level hasMany Excercise
            await queryInterface.addColumn(
                'exercises',
                'difficulty_level_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'difficulty_levels',
                        key: 'id'
                    },
                    allowNull: false
                }
            )
        }).then(async () => {
            // 3. User belongsTo a Rank || Rank hasMany Users
            await queryInterface.addColumn(
                'users',
                'rank_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'ranks',
                        key: 'id'
                    },
                    allowNull: false,
                    defaultValue: defaultValue.RANK
                }
            )
        }).then(async () => {
            // 4. User belongsTo a Avatar || Avatar hasMany Users
            await queryInterface.addColumn(
                'users',
                'avatar_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'avatars',
                        key: 'id'
                    },
                    defaultValue: defaultValue.AVATAR
                }
            )
        }).then(async () => {
            // 5. Answer belongsTo User || User hasMany Answer
            await queryInterface.addColumn(
                'answers',
                'user_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    allowNull: false,
                    onDelete: 'CASCADE' // Slett alle besvarelser som er knyttet til bruker som slettes
                }
            )
        }).then(async () => {
            // 6. Answer belongsTo Exercise || Exercise hasMany Answer
            await queryInterface.addColumn(
                'answers',
                'exercise_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'exercises',
                        key: 'id'
                    },
                    allowNull: false,
                    onDelete: 'CASCADE' // Sletter besvarelser knyttet til en slettet oppgave
                }
            )
        })
            // 7 og 8 i create-rank-has-avatar (n:m)
        .then(async () => {
            // 9. Login belongsTo User || User hasMany Logins
            await queryInterface.addColumn(
                'logins',
                'user_id',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    allowNull: false,
                    onDelete: 'CASCADE' // Slett all innlogginger knyttet til en bruker som slettes
                }
            )
        })
            .then(async () => {
                // 10. synonym belongsTo word || Word hasMany synonyms
                await queryInterface.addColumn(
                    'synonyms',
                    'word_id',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'words',
                            key: 'id'
                        },
                        allowNull: false,
                        onDelete: 'CASCADE' // Slett alle synomymer knyttet til ett ord, hvis ordet slettes
                    }
                )
            })
        // 11 og 12 i i create-exercise-has-word (n:m)
        // 13 og 14 i i create-user-has-achievement (n:m)
    },

    down: async (queryInterface, Sequelize) => {
        // 1
        await queryInterface.removeColumn(
            'exercises',
            'author_id'
        ).then(async () => {
            // 2
            await queryInterface.removeColumn(
                'exercises',
                'difficulty_level_id'
            )
        }).then(async () => {
            // 3
            await queryInterface.removeColumn(
                'users',
                'rank_id'
            )
        }).then(async () => {
            // 4
            await queryInterface.removeColumn(
                'users',
                'avatar_id'
            )
        }).then(async () => {
            // 5
            await queryInterface.removeColumn(
                'answers',
                'user_id'
            )
        }).then(async () => {
            // 6
            await queryInterface.removeColumn(
                'answers',
                'exercise_id'
            )
        }).then(async () => {
            // 9
            await queryInterface.removeColumn(
                'logins',
                'user_id'
            )
        }).then(async () => {
            // 10
            await queryInterface.removeColumn(
                'synonyms',
                'word_id'
            )
        })
    }
};
