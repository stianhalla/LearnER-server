/**
 * @author Ala Mehersia
 * klasse for kobling mellom spørsmål og ressurser
 * */
'use strict';
const {Model} = require('sequelize');
const { notNullMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class Quiz_question_has_resource extends Model {

    static associate({Db_quiz_question, Db_quiz_resource}) {
      this.belongsTo(Db_quiz_question, {
        foreignKey: { name: 'question_id'},
        as: 'question'
      });

      this.belongsTo(Db_quiz_resource, {
        foreignKey: { name: 'resource_id'},
        as: 'resource'
      });
    }
  }
  Quiz_question_has_resource.init({
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg}
      }
    },
    resource_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg}
      }
    }

  }, {
    sequelize,
    timestamps: false,
    modelName: 'Quiz_question_has_resource',
    tableName: 'quiz_question_has_resources',
  });
  return Quiz_question_has_resource;
};