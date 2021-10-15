const express = require("express");
const {
  signup,
  login,
  protect,
} = require("../../controllers/users/authController");
const {
  getMe,
  updateMyPassword,
  updateMe,
  deleteMe,
} = require("../../controllers/users/userController");

const {
  getAllEtraps,
  getEtrap,
} = require("../../controllers/users/etrapController");
const { searchCities } = require("../../controllers/users/citiesController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/my-accaunt", protect, getMe);
router.patch("/update-my-password", protect, updateMyPassword);
router.patch("/update-me", protect, updateMe);
router.delete("/delete-me", protect, deleteMe);

router.get("/etraps", protect, getAllEtraps);
router.get("/etraps/:id", protect, getEtrap);

router.get("/cities/search", protect, searchCities);

module.exports = router;
