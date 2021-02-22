'use strict';

const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg, isBoolean} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class SQL_quiz_alternative extends Model {

    static associate({SQL_quiz_question}) {

      this.belongsTo(SQL_quiz_question, {
        foreignKey: { name: 'question_id'},
        as: 'question'
      })

    }
  }

  SQL_quiz_alternative.init({
    alternative_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg}
      }
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    }
  }, {
    sequelize,
    modelName: 'SQL_quiz_alternative',
    tableName: 'SQL_quiz_alternatives'
  });
  return SQL_quiz_alternative;
};