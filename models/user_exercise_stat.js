'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_exercise_stat extends Model {

    static associate({ Exercise, User }) {

      this.belongsTo(Exercise, {
        foreignKey: 'exercise_id'
      })

      this.belongsTo(User, {
        foreignKey: 'user_id'
      })

    }
  };
  User_exercise_stat.init({
    completed: DataTypes.BOOLEAN,
    attempts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_exercise_stat',
    tableName: 'user_exercise_stats',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return User_exercise_stat;
};