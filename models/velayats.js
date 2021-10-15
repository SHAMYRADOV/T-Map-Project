"use strict";
const { Model } = require("sequelize");
const cities = require("./cities");
module.exports = (sequelize, DataTypes) => {
  class Velayats extends Model {
    static associate({ Etraps, Cities }) {
      this.hasMany(Etraps, {
        foreignKey: "velayatId",
        as: "velayat_etraps",
      });
      this.hasMany(Cities, {
        foreignKey: "velayatId",
        as: "velayat_cities",
      });
    }
  }
  Velayats.init(
    {
      velayat_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      velayat_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      velayat_territory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      velayat_population: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      velayat_center: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: "velayats",
      modelName: "Velayats",
    }
  );
  return Velayats;
};
