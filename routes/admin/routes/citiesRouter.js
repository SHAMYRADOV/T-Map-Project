const express = require("express");
const {
  getAllCities,
  getCity,
  addCity,
  editCity,
  deleteCity,
} = require("../../../controllers/admin/citiesController");

const router = express.Router();

router.get("/", getAllCities);
router.get("/:id", getCity);
router.post("/", addCity);
router.patch("/edit/:id", editCity);
router.delete("/delete/:id", deleteCity);

module.exports = router;
