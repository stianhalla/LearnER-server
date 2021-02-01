'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank_has_avatar extends Model {

    static associate({ Rank, Avatar }) {

      this.belongsTo(Avatar, {
        foreignKey: 'avatar_id',
        as: 'avatar' // Navn som vises i include
      })

      this.belongsTo(Rank, {
        foreignKey: 'rank_id',
        as: 'rank' // Navn som vises i include
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
  Rank_has_avatar.init({
    rank_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    avatar_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Rank_has_avatar',
    tableName: 'rank_has_avatars',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Rank_has_avatar;
};