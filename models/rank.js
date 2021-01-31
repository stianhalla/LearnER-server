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