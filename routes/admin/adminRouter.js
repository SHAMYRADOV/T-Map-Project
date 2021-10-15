const express = require("express");
const {
  login,
  protect,
  updateMe,
} = require("../../controllers/admin/adminController");
const router = express.Router();

router.post("/login", login);
router.post("/update", protect, updateMe);
router.use("/velayats", protect, require("./routes/velayatsRouter"));
router.use("/cities", protect, require("./routes/citiesRouter"));
router.use("/etraps", protect, require("./routes/etrapRouter"));
router.use("/users", protect, require("./routes/usersRouter"));

module.exports = router;
