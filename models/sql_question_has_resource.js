'use strict';
const {Model} = require('sequelize');
const { notNullMsg} = require('../config/validations');

module.exports = (sequelize, DataTypes) => {
  class SQL_question_has_resource extends Model {

    static associate({SQL_quiz_question, SQL_quiz_resource}) {
      this.belongsTo(SQL_quiz_question, {
        foreignKey: { name: 'question_id'},
        as: 'question'
      });

      this.belongsTo(SQL_quiz_resource, {
        foreignKey: { name: 'resource_id'},
        as: 'resource'
      });
    }
  }
  SQL_question_has_resource.init({
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
    modelName: 'SQL_question_has_resource',
    tableName: 'SQL_question_has_resources',
  });
  return SQL_question_has_resource;
};