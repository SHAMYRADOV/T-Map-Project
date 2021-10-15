"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Citiesandetraps extends Model {
    static associate({}) {}
  }
  Citiesandetraps.init(
    {
      cityId: DataTypes.INTEGER,
      etrapId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "citiesandetraps",
      modelName: "Citiesandetraps",
    }
  );
  return Citiesandetraps;
};
