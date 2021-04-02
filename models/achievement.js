/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere achievements
 * */

'use strict';
const {isAchievementType} = require("../config/validations");
const {isIntMsg} = require("../config/validations");
const {defaultValue} = require("../config/types");
const {notEmptyMsg} = require("../config/validations");
const {notNullMsg} = require("../config/validations");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {

    static associate({ User }) {

      this.belongsToMany(User, {
        through: 'user_has_achievements',
        foreignKey: 'achievement_id',
        as: 'users'
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
  }

  Achievement.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
      }
    },
    type:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: defaultValue.ACHIEVEMENT_TYPE,
      validate:{
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
        isAchievementType
      }
    },
    reward:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
      }
    },
    requires:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
      }
    }
  }, {
    sequelize,
    tableName: 'achievements',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    modelName: 'Achievement',
  });
  return Achievement;
};