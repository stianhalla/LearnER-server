'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Exercise, Avatar, Answer, Login, Rank }) {

      // En bruker kan være forfatter for mange oppgaver
      this.hasMany(Exercise, {
        foreignKey: 'author_id'
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
        avatar_id: undefined,
        rank_id: undefined
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
        min: 8
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate:{
        isNumeric: true,
        len: [1, 3] // 1 = student, 2 = lærer , 3 er til utviddelse
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    selected_notation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate:{
        isNumeric: true,
        len: [1, 4] // 1 = ER, 2 = UML 3 = forenklet ER, 4 er til utviddelse
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { isNumeric: true }
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