/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere synonymer
 * */

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Synonym extends Model {

    static associate({ Word }) {

      this.belongsTo(Word, {
        foreignKey: 'word_id',
        as: 'word'
      });

    }
  }

  Synonym.init({
    synonym: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Synonym',
    tableName: 'synonyms',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });
  return Synonym;
};