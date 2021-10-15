const express = require("express");
const {
  addVelayat,
  getAllVelayats,
  getVelayat,
  deleteVelayat,
  editVelayat,
} = require("../../../controllers/admin/velayatsController");

const router = express.Router();

router.get("/", getAllVelayats);
router.get("/:id", getVelayat);
router.post("/add", addVelayat);
router.delete("/delete/:id", deleteVelayat);
router.patch("/edit/:id", editVelayat);

module.exports = router;
