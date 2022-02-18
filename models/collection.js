"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      collection.belongsTo(models.genre, {
        foreignKey: {
          name: "genreId",
        },
      });
      collection.belongsTo(models.tb_book, {
        foreignKey: {
          name: "bookId",
        },
      });
      collection.belongsTo(models.user, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  collection.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      genreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collection",
    }
  );
  return collection;
};
