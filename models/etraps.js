"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Etraps extends Model {
    static associate({ Velayats, Cities }) {
      this.belongsTo(Velayats, {
        foreignKey: "velayatId",
        as: "velayat",
      });
      this.belongsToMany(Cities, {
        through: "Citiesandetraps",
        as: "etrap_cities",
        foreignKey: "etrapId",
      });
    }
  }
  Etraps.init(
    {
      etrap_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      etrap_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      etrap_image: {
        type: DataTypes.STRING,
      },
      velayatId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "etraps",
      modelName: "Etraps",
    }
  );
  return Etraps;
};
