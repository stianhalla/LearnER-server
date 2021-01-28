'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {

    static associate({ User, Difficulty_level, Answer }) {
      // En oppgave tilghører en bruker (forfatter)
      this.belongsTo(User, {
        foreignKey: 'author_id'
      }); // Fremmednøkkel i exercises tabellen

      this.belongsTo(Difficulty_level, {
        foreignKey: 'difficulty_level_id'
      });

      this.hasMany(Answer, {
        foreignKey: 'exercise_id'
      })

      this.belongsToMany(User, {
        through: 'user_exercise_stats',
        foreignKey: 'exercise_id'
      })
    }
  };
  Exercise.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    solution: DataTypes.JSON,
    public: DataTypes.BOOLEAN,
    extra_points: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    extra_relation_names: DataTypes.STRING,
    extra_entity_names: DataTypes.STRING,
    extra_attribute_names: DataTypes.STRING,
    hint: DataTypes.TEXT,
    hint_penalty: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'exercises',
    modelName: 'Exercise',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Exercise;
};