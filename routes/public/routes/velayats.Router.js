const express = require("express");
const {
  getAllVelayats,
  getVelayat,
} = require("../../../controllers/public/velayatsController");

const router = express.Router();

router.get("/", getAllVelayats);
router.get("/:id", getVelayat);

module.exports = router;
