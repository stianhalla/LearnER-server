'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const resources = [];

    resources.push({
      title: 'Tabell Vare',
      text: '<table class="table table-hover lead">' +
          '  <tbody><tr class="success">\n' +
          '    <th>Id</th>\n' +
          '\t<th>Navn</th>\n' +
          '\t<th>Antall</th>\n' +
          '\t<th>Pris</th>\n' +
          '\t<th>Kategori</th>\n' +
          '  </tr>\n' +
          '  <tr>\n' +
          '    <td>1003</td>\n' +
          '\t<td>Hammer</td>\n' +
          '\t<td>10</td>\n' +
          '\t<td>50</td>\n' +
          '\t<td>Verktøy</td>\n' +
          '  </tr>\n' +
          '  <tr>\n' +
          '    <td>1013</td>\n' +
          '\t<td>Maling, 3 liter</td>\n' +
          '\t<td>5</td>\n' +
          '\t<td>129</td>\n' +
          '\t<td>Maling</td>\n' +
          '  </tr>\n' +
          '  <tr>\n' +
          '    <td>1014</td>\n' +
          '\t<td>Maling, 1 liter</td>\n' +
          '\t<td>50</td>\n' +
          '\t<td>59</td>\n' +
          '\t<td>Maling</td>\n' +
          '  </tr>\n' +
          '  <tr>\n' +
          '    <td>1029</td>\n' +
          '\t<td>Spikerpakke XY</td>\n' +
          '\t<td>75</td>\n' +
          '\t<td>60</td>\n' +
          '\t<td>Småting</td>\n' +
          '  </tr>\n' +
          '</tbody></table>'
    });

    await queryInterface.bulkInsert('sql_quiz_resources', resources, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sql_quiz_resources', null, {});
    await queryInterface.sequelize.query('ALTER TABLE sql_quiz_resources AUTO_INCREMENT = 1');
  }
};
