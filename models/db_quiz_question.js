'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');
module.exports = (sequelize, DataTypes) => {
  class Db_quiz_question extends Model {

    static associate({Db_quiz_chapter, Db_quiz_resource, Db_quiz_alternative}) {

      this.belongsToMany(Db_quiz_resource, {
        through: 'db_question_has_resource',
        foreignKey: 'question_id',
        as: 'question'
      });

      this.hasMany(Db_quiz_alternative, {
        foreignKey: 'question_id',
      });

      this.belongsTo(Db_quiz_chapter, {
        foreignKey: { name: 'chapter_id'},
        as: 'chapter'
      });

    }
  }
  Db_quiz_question.init({
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
    timestamps: false,
    modelName: 'Db_quiz_question',
    tableName: 'Db_quiz_questions'
  });
  return Db_quiz_question;
};