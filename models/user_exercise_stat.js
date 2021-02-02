'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_exercise_stat extends Model {

    static associate({ Exercise, User }) {

      this.belongsTo(Exercise, {
        foreignKey: 'exercise_id',
      })

      this.belongsTo(User, {
        foreignKey: 'user_id'
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
  User_exercise_stat.init({
    completed: {
      type: DataTypes.BOOLEAN
    },
    attempts: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User_exercise_stat',
    tableName: 'user_exercise_stats',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return User_exercise_stat;
};