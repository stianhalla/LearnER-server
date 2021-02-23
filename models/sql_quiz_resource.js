'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class SQL_quiz_resource extends Model {

    static associate({SQL_quiz_question}) {
      this.belongsToMany(SQL_quiz_question, {
        through: 'sql_question_has_resource',
        foreignKey: 'resource_id',
        as: 'questions'
      });

    }
  }
  SQL_quiz_resource.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: notNullMsg},
          notEmpty: {msg: notEmptyMsg}
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SQL_quiz_resource',
    tableName: 'sql_quiz_resources'
  });
  return SQL_quiz_resource;
};