"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {}
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }
  Admin.init(
    {
      admin_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "admin",
      modelName: "Admin",
    }
  );
  return Admin;
};
