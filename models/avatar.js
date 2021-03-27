/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere avatarer
 * */

'use strict';
const { Model } = require('sequelize');
const { notNullMsg, notEmptyMsg} = require('../config/validations')

module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {

    static associate({ User, Rank }) {

      this.belongsToMany(Rank, {
        through: 'rank_has_avatars',
        foreignKey: 'avatar_id',
        as: 'ranks'
      })

      this.hasMany(User, {
        foreignKey: 'avatar_id'
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
  Avatar.init({
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg}
      }
    }
  }, {
    sequelize,
    tableName: 'avatars',
    modelName: 'Avatar',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Avatar;
};