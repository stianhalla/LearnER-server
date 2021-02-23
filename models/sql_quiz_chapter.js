'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class SQL_quiz_chapter extends Model {
    static associate({SQL_quiz_question}) {

      this.hasMany(SQL_quiz_question, {
        foreignKey: 'chapter_id',
      });

    }
  };
  SQL_quiz_chapter.init({
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
    modelName: 'SQL_quiz_chapter',
    tableName: 'sql_quiz_chapters'
  });
  return SQL_quiz_chapter;
};