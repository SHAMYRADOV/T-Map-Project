"use strict";
const bcrypt = require("bcrypt");
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.bulkInsert("admin", [
      {
        admin_id: uuid.v4(),
        username: "tmapadmin",
        password: await bcrypt.hash("tmapadmin", 12),
        createdAt: DataTypes.fn("now"),
        updatedAt: DataTypes.fn("now"),
      },
    ]);
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.bulkDelete("admin", null, {});
  },
};
