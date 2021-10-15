const express = require("express");
const router = express.Router();

router.use("/velayats", require("./routes/velayats.Router"));
router.use("/cities", require("./routes/citiesRouter"));

module.exports = router;
