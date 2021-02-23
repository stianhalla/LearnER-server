'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');
module.exports = (sequelize, DataTypes) => {
  class SQL_quiz_question extends Model {

    static associate({SQL_quiz_chapter, SQL_quiz_resource, SQL_quiz_alternative}) {

      this.belongsToMany(SQL_quiz_resource, {
        through: 'sql_question_has_resource',
        foreignKey: 'question_id',
        as: 'question'
      });

      this.hasMany(SQL_quiz_alternative, {
        foreignKey: 'question_id',
      });

      this.belongsTo(SQL_quiz_chapter, {
        foreignKey: { name: 'chapter_id'},
        as: 'chapter'
      });

    }
  }
  SQL_quiz_question.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    }
  }, {
    sequelize,
    modelName: 'SQL_quiz_question',
    tableName: 'sql_quiz_questions'
  });
  return SQL_quiz_question;
};