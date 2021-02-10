'use strict';
const { Model } = require('sequelize');
const { isDateMsg, notNullMsg, notEmptyMsg, isIntMsg, isBoolean} = require('../config/validations')

module.exports = (sequelize, DataTypes) => {
  class User_exercise_stat extends Model {

    static associate({ Exercise, User }) {

      this.belongsTo(Exercise, {
        foreignKey: 'exercise_id',
        as: 'exercise'
      })

      this.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
      })

    }
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        created_at: undefined,
        updated_at: undefined
      }
    }
  };
  User_exercise_stat.init({
    user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    exercise_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    },
    completed_at:{
      type: DataTypes.DATE,
      validate:{
        isDate: {msg: isDateMsg}
      }
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    }
  }, {
    sequelize,
    modelName: 'User_exercise_stat',
    tableName: 'user_exercise_stats',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return User_exercise_stat;
};