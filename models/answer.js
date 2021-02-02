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
      allowNull: false,
      type: DataTypes.JSON,
      validate:{ // TODO sjekk korekt JSON format
        notEmpty: {msg: 'Field `answer` cannot be empty'},
      }
    },
    points: {
      type: DataTypes.INTEGER
    },
    penalty_recived: {
      type: DataTypes.INTEGER
    },
    hint_used: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean(val){
          if(typeof val !== 'boolean'){
            throw new Error('Only boolean values are allowed')
          }
        }
      }
    } ,
    with_help: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        notEmpty: {msg: 'Field `with_help` cannot be empty'},
        isBoolean(val){
          if(typeof val !== 'boolean'){
            throw new Error('Only boolean values are allowed')
          }
        }
      }
    },
    progression: {
      type: DataTypes.INTEGER,
      validate: {
        len: {args: [0-100], msg: 'Field `progression` must be between 0 and 100'}
      }
    },
    times_checked: {
      type: DataTypes.INTEGER
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: {msg: 'Field `exercise_id` cannot be empty'},
        isInteger(val){
          if( !Number.isInteger(val) ){
            throw new Error('Field `exercise_id` must be of type Integer')
          }
        }
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