const catchAsync = require("../../utils/catchAsync");
const { Users } = require("../../models");
const AppError = require("../../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await Users.findAll();

  return res.status(200).send(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user_id = req.params.id;
  const user = await Users.findOne({
    where: { user_id },
  });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  return res.status(200).send(user);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user_id = req.params.id;
  const user = await Users.findOne({
    where: { user_id },
  });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  await user.destroy();

  return res.status(200).send("Successfully deleted!");
});
