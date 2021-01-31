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
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        created_at: undefined,
        updated_at: undefined
      }
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