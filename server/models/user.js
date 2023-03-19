'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/hashPassword");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Book,{
        through:"RentalBook",
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Email cannot be empty` },
        isEmail: { msg: `Must be an email` }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Password cannot be empty` },
        len: { args: [8, 255], msg: `Minimum password length is 5` }
      }
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Phone Number cannot be empty` }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    const hash = hashPassword(user.password, 10);
    user.password = hash;
    user.role = "User";
  });

  return User;
};