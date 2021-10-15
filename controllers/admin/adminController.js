const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const { Admin } = require("../../models");
const AppError = require("../../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, "kerim", {
    expiresIn: "24h",
  });
};

const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin.admin_id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(statusCode).json({
    token,
    data: {
      admin,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }

  const admin = await Admin.findOne({ where: { username } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  createSendToken(admin, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged as an Admin!", 401));
  }

  const decoded = await promisify(jwt.verify)(token, "kerim");
  const freshAdmin = await Admin.findOne({ where: { admin_id: decoded.id } });
  if (!freshAdmin) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  req.admin = freshAdmin;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { username, password, newPassword, newPasswordConfirm } = req.body;

  if (!username) {
    return next(new AppError("Please provide username and password", 400));
  }

  const admin = await Admin.findOne();

  if (password && newPassword) {
    if (!(await bcrypt.compare(password, admin.password))) {
      return next(new AppError("Your current password is incorrect"), 401);
    }

    if (newPassword !== newPasswordConfirm) {
      return next(new AppError("New passwords are not the same", 400));
    }

    admin.update({
      password: await bcrypt.hash(newPassword, 12),
    });
  }

  await admin.update({
    username,
  });

  createSendToken(admin, 200, res);
});
