'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
const { notation, userType, defaultValue} = require('../config/types')
const { lenPwdMsg, isIntMsg, isEmailMsg, notNullMsg, notEmptyMsg, isNotation, isUserType, isBoolean, isUsername} = require('../config/validations')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Exercise, Avatar, Answer, Login, Rank, User_exercise_stat }) {

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
        through: User_exercise_stat,
        foreignKey: 'user_id',
        as: 'exercises'
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
        avatar_id: undefined,
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
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isUsername
      }
    },
    password: { // Blir 'hashet' i beforeSave hook
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        len: { args: [8], msg: lenPwdMsg}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isEmail: {msg: isEmailMsg},
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: defaultValue.USER_TYPE,
      validate:{
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
        isUserType
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: defaultValue.VERIFIED,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isBoolean
      }
    },
    selected_notation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: defaultValue.NOTATION,
      validate:{
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
        isNotation,
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg},
      }
    },
    avatar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: defaultValue.AVATAR ,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
      }
    },
    rank_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: defaultValue.RANK,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
        isInt: {msg: isIntMsg}
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
          user.password = await bcrypt.hash(user.password, salt);
        }catch (err){
          console.log("Feil ved hashing av passord...")
        }
      }
    }
  });
  return User;
};