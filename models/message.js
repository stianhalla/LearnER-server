'use strict';
const { Model } = require('sequelize');
const { isIntMsg, lenMsg } = require('../config/validations')

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      // define association here
    }
  };
  Message.init({
    msg_key: {
      type: DataTypes.STRING(30),
      validate:{
        len: { args: [0,30], msg: lenMsg}
      }
    },
    msg_level: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: {msg: isIntMsg }
      }
    },
    msg_lang: {
      type: DataTypes.STRING(3),
      validate:{
        len: { args: [3,3], msg: lenMsg}
      }
    },
    msg_alt: {
      type: DataTypes.STRING(3),
      validate:{
        len: { args: [3,3], msg: lenMsg}
      }
    },
    msg_text: {
      type: DataTypes.STRING(10000)
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Message;
};