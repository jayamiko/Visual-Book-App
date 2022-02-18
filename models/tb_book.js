"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tb_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tb_book.belongsTo(models.genre, {
        as: "genres",
        foreignKey: {
          name: "idGenre",
        },
      });
    }
  }
  tb_book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      status: DataTypes.STRING,
      isbn: DataTypes.INTEGER,
      publishIn: DataTypes.DATE,
      price: DataTypes.STRING,
      pages: DataTypes.STRING,
      reviews: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      description: DataTypes.STRING,
      idGenre: DataTypes.INTEGER,
      attachement: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tb_book",
    }
  );
  return tb_book;
};
