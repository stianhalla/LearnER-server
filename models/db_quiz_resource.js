'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class Db_quiz_resource extends Model {

    static associate({Db_quiz_question}) {
      this.belongsToMany(Db_quiz_question, {
        through: 'db_question_has_resource',
        foreignKey: 'resource_id',
        as: 'questions'
      });

    }
  }
  Db_quiz_resource.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {msg: notNullMsg},
          notEmpty: {msg: notEmptyMsg}
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Db_quiz_resource',
    tableName: 'db_quiz_resources'
  });
  return Db_quiz_resource;
};