'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Difficulty_level extends Model {

    static associate({ Exercise }) {
      this.hasMany(Exercise, {
        foreignKey: 'difficulty_level_id'
      })
    }
  };
  Difficulty_level.init({
    name: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'difficulty_levels',
    modelName: 'Difficulty_level',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Difficulty_level;
};