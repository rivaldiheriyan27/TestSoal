'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsToMany(models.User,{
        through:"RentalBook",
      })
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isbn: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};