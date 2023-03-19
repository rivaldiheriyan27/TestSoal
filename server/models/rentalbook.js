'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalBook extends Model {
    static associate(models) {
      RentalBook.belongsTo(models.User, {
        foreignKey: "UserId"
      }), RentalBook.belongsTo(models.Book, {
        foreignKey: "BookId"
      });
    }
  }
  RentalBook.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    rentNumber: DataTypes.INTEGER,
    status: DataTypes.STRING,
    returnEstimate: DataTypes.DATE,
    actualEstimate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RentalBook',
  });
  return RentalBook;
};