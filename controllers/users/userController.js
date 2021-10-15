const bcrypt = require("bcrypt");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Users } = require("../../models");
const { createSendToken } = require("../../utils/createSendToken");

exports.getMe = catchAsync(async (req, res, next) => {
  return res.status(200).send(req.user);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword)
    return next(
      new AppError(
        "You have to provide your current password and new password",
        400
      )
    );

  if (newPassword != newPasswordConfirm || newPassword.length < 6)
    return next(
      new AppError(
        "New Passwords are not the same or less than 6 characters",
        400
      )
    );

  const user = await Users.findOne({ where: { user_id: req.user.user_id } });

  if (!(await bcrypt.compare(currentPassword, user.user_password))) {
    return next(new AppError("Your current password is incorrect", 401));
  }

  user.user_password = await bcrypt.hash(newPassword, 12);
  await user.save();

  createSendToken(user, 200, res);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { user_name, user_address } = req.body;
  if (!user_name || !user_address)
    return next(new AppError("Invalid credentials", 400));

  const user = await Users.findOne({ where: { user_id: req.user.user_id } });

  await user.update({
    user_name,
    user_address,
  });

  createSendToken(user, 200, res);
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  if (req.body.user_phone != req.user.user_phone) {
    return next(new AppError("Phone number is incorrect", 400));
  }

  await Users.destroy({ where: { user_phone: req.user.user_phone } });

  res.status(200).send("User successfully deleted");
});
