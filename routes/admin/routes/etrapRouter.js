const express = require("express");
const {
  getAllEtraps,
  getEtrap,
  addEtrap,
  editEtrap,
  deleteEtrap,
  uploadEtrapImage,
  uploadPhoto,
} = require("../../../controllers/admin/etrapController");

const router = express.Router();

router.get("/", getAllEtraps);
router.get("/:id", getEtrap);
router.post("/", addEtrap);
router.patch("/edit/:id", editEtrap);
router.delete("/delete/:id", deleteEtrap);
router.post("/upload-image/:id", uploadPhoto, uploadEtrapImage);

module.exports = router;
