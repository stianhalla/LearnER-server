'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {

    static associate({ User, Difficulty_level, Answer }) {
      // En oppgave tilghører en bruker (forfatter)
      this.belongsTo(User, {
        foreignKey: 'author_id',
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
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        created_at: undefined,
        updated_at: undefined
      }
    }
  };
  Exercise.init({
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    solution: {
      type: DataTypes.JSON
    },
    public: {
      type: DataTypes.BOOLEAN
    },
    extra_points: {
      type: DataTypes.INTEGER
    },
    tags: {
      type: DataTypes.STRING
    },
    extra_relation_names: {
      type: DataTypes.STRING
    },
    extra_entity_names: {
      type: DataTypes.STRING
    },
    extra_attribute_names: {
      type: DataTypes.STRING
    },
    hint: {
      type: DataTypes.TEXT
    },
    hint_penalty: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'exercises',
    modelName: 'Exercise',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Exercise;
};