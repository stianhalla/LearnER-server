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
    msg_key: {
      type: DataTypes.STRING(30)
    },
    msg_level: {
      type: DataTypes.INTEGER
    },
    msg_lang: {
      type: DataTypes.STRING(3)
    },
    msg_alt: {
      type: DataTypes.STRING(3)
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