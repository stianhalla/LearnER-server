'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {

    static associate({ User, Exercise }) {

      this.belongsTo(User, {
        foreignKey: 'user_id'
      })

      this.belongsTo(Exercise, {
        foreignKey: 'exercise_id'
      })

    }
  };
  Answer.init({
    answer: DataTypes.JSON,
    points: DataTypes.INTEGER,
    penalty_recived: DataTypes.INTEGER,
    hint_used: DataTypes.BOOLEAN,
    with_help: DataTypes.BOOLEAN,
    progression: DataTypes.INTEGER,
    times_checked: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Answer;
};