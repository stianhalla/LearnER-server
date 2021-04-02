/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere koblingstabell achivements og brukere
 * */

'use strict';
const {isBoolean} = require("../config/validations");
const {notEmptyMsg} = require("../config/validations");
const {notNullMsg} = require("../config/validations");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_has_achievement extends Model {

    static associate({ User, Achievement }) {

      this.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user' // Navn som vises i include
      })

      this.belongsTo(Achievement, {
        foreignKey: 'achievement_id',
        as: 'achievement' // Navn som vises i include
      })

    }
  }

  User_has_achievement.init({
    user_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    achievement_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    reward_retrieved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    }
  }, {
    sequelize,
    tableName: 'user_has_achievements',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    modelName: 'User_has_achievement',
  });
  return User_has_achievement;
};