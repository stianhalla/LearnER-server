'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {

    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'user_id'
      })
    }
  };
  Login.init({
    slett: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
    tableName: 'logins',
    createdAt: 'signed_in_at',
    updatedAt: false
  });
  return Login;
};