'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class Db_quiz_chapter extends Model {
    static associate({Db_quiz_question}) {

      this.hasMany(Db_quiz_question, {
        foreignKey: 'chapter_id',
      });

    }
  }
  Db_quiz_chapter.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    }
  }, {
    sequelize,
    modelName: 'Db_quiz_chapter',
    tableName: 'db_quiz_chapters'
  });
  return Db_quiz_chapter;
};