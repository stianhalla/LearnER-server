'use strict';
const { Model } = require('sequelize');
const { isJSON, notNullMsg, isIntMsg, notEmptyMsg, isBoolean, lenMsg } = require('../config/validations')

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
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        created_at: undefined,
        updated_at: undefined
      }
    }
  };
  Answer.init({
    answer: {
      type: DataTypes.JSON,
      validate:{
        isJSON
      }
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    penalty_recived: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    hint_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    } ,
    with_help: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    },
    submitted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    },
    progression: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
        len: {args: [0, 100], msg: lenMsg}
      }
    },
    times_checked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    user_id: {
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
    modelName: 'Answer',
    tableName: 'answers',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Answer;
};