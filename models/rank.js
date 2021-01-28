'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank extends Model {

    static associate({ Avatar }) {

      this.belongsToMany(Avatar, {
        through: 'rank_has_avatars',
        foreignKey: 'rank_id'
      })

    }
  };
  Rank.init({
    name: DataTypes.STRING,
    points_required: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'ranks',
    modelName: 'Rank',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Rank;
};