const express = require("express");
const {
  getAllCities,
  getCity,
} = require("../../../controllers/public/citiesController");

const router = express.Router();

router.get("/", getAllCities);
router.get("/:id", getCity);

module.exports = router;
