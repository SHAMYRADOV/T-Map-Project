"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate({ Velayats, Etraps }) {
      this.belongsTo(Velayats, {
        foreignKey: "velayatId",
        as: "velayat",
      });
      this.belongsToMany(Etraps, {
        through: "Citiesandetraps",
        as: "city_etraps",
        foreignKey: "cityId",
      });
    }
  }
  Cities.init(
    {
      city_id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      city_territory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      city_schools: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      velayatId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      tableName: "cities",
      modelName: "Cities",
    }
  );
  return Cities;
};
