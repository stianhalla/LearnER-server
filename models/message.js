'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      // define association here
    }
  };
  Message.init({
    msg_key: DataTypes.STRING(30),
    msg_level: DataTypes.INTEGER,
    msg_lang: DataTypes.STRING(3),
    msg_alt: DataTypes.STRING(3),
    msg_text: DataTypes.STRING(10000)
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    updatedAt: 'updated_at',
    createdAt: 'signed_in_at'
  });
  return Message;
};