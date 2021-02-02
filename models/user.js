'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
const { notation, userType} = require('../config/types')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Exercise, Avatar, Answer, Login, Rank }) {

      // En bruker kan være forfatter for mange oppgaver
      this.hasMany(Exercise, {
        foreignKey: 'author_id',
      }); // Fremmednøkkel hos exercise tabell

      this.belongsTo(Avatar, {
        foreignKey: { name: 'avatar_id', defaultValue: 1 }, // Bruker starter med avatar 1
        as: 'avatar' // Navnet som vises ved include
      })

      this.belongsTo(Rank, {
        foreignKey: { name:'rank_id', defaultValue: 1 }, // Bruker starter med rank 1
        as: 'rank' // Navnet som vises ved include
      })

      this.hasMany(Answer, {
        foreignKey: 'user_id'
      })

      this.hasMany(Login, {
        foreignKey: 'user_id'
      })

      this.belongsToMany(Exercise, {
        through: 'user_exercise_stats',
        foreignKey: 'user_id'
      })
    }

    // Metode for å sjekke passord
    async comparePassword(candidatePassword){
      return bcrypt.compare(candidatePassword, this.password);
    }

    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        rank_id: undefined,
        created_at: undefined,
        updated_at: undefined
      }
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: { // Blir 'hashet' i beforeSave hook
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
        len: { args: [8], msg: 'Password needs to be at least 8 characters'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
        notEmpty: true,
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: userType.STUDENT,
      validate:{
        isNumeric: true,
        notEmpty: true,
        isUserType(val){
          if( ![userType.STUDENT, userType.TEACHER].includes(val) ){
            throw new Error(`Wrong value for user type, valid values is ${userType.STUDENT} and ${userType.TEACHER}`)
          }
        }
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
        isBoolean(val){
          if(typeof val !== 'boolean'){
            throw new Error('Only boolean values are allowed!')
          }
        }
      }
    },
    selected_notation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: notation.ER,
      validate:{
        notEmpty: true,
        isNotation(val){
          if( ![notation.ER, notation.UML, notation.SIMPLIFIED_ER].includes(val) ){
            throw new Error(`Wrong value for user type, valid values is ${notation.ER}, ${notation.UML} and ${notation.SIMPLIFIED_ER} `)
          }
        }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty:true,
        isNumeric: true
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeSave: async (user) => {
        try{
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(user.password, salt)
          user.password = hashedPassword;
        }catch (err){
          console.log("Feil ved hashing av passord...")
        }
      }
    }
  });
  return User;
};