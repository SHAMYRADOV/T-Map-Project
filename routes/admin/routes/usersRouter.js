const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../../../controllers/admin/usersController");

const router = express.Router();

router.get("/", getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
