'use strict';
const { Model } = require('sequelize');
const { notNullMsg, notEmptyMsg, isJSON, isBoolean, isIntMsg} = require('../config/validations')

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {

    static associate({ User, Difficulty_level, Answer, User_exercise_stat }) {
      // En oppgave tilghører en bruker (forfatter)
      this.belongsTo(User, {
        foreignKey: 'author_id',
        as: 'author'
      }); // Fremmednøkkel i exercises tabellen

      this.belongsTo(Difficulty_level, {
        foreignKey: 'difficulty_level_id',
        as: 'difficulty_level'
      });

      this.hasMany(Answer, {
        foreignKey: 'exercise_id'
      })

      this.belongsToMany(User, {
        through: User_exercise_stat,
        foreignKey: 'exercise_id',
        as: 'users'
      })
    }
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        difficulty_level_id: undefined,
        author_id: undefined,
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
      type: DataTypes.JSON,
      validate: {
        isJSON
      }
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    },
    extra_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {msg: isIntMsg}
      }
    },
    difficulty_level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
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