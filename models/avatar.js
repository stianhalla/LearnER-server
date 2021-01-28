'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {

    static associate({ User, Rank }) {

      this.belongsToMany(Rank, {
        through: 'rank_has_avatars',
        foreignKey: 'avatar_id'
      })

      this.hasMany(User, {
        foreignKey: 'avatar_id'
      })
    }
  };
  Avatar.init({
    filename: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'avatars',
    modelName: 'Avatar',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Avatar;
};