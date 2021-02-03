'use strict';
const { Model } = require('sequelize');
const { notNullMsg, notEmptyMsg, isIntMsg} = require('../config/validations')

module.exports = (sequelize, DataTypes) => {
  class Rank extends Model {

    static associate({ Avatar }) {

      this.belongsToMany(Avatar, {
        through: 'rank_has_avatars',
        foreignKey: 'rank_id',
        as: 'avatars'
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
  Rank.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    },
    points_required: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    }
  }, {
    sequelize,
    tableName: 'ranks',
    modelName: 'Rank',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Rank;
};