/**
 * @author Ala Mehersia
 * klasse for quiz alternativer
 * */
'use strict';
const {Model} = require('sequelize');
const { notNullMsg, notEmptyMsg, isBoolean} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class Db_quiz_alternative extends Model {

    static associate({Db_quiz_question}) {

      this.belongsTo(Db_quiz_question, {
        foreignKey: { name: 'question_id'},
        as: 'question'
      })

    }
  }

  Db_quiz_alternative.init({
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
    timestamps: false,
    modelName: 'Db_quiz_alternative',
    tableName: 'db_quiz_alternatives'
  });
  return Db_quiz_alternative;
};