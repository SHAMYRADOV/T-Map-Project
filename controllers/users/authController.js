const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const { createSendToken } = require("../../utils/createSendToken");
const AppError = require("../../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("You are not logged in", 401));

  const decoded = await promisify(jwt.verify)(token, "kerim");

  const freshUser = await Users.findOne({ where: { user_id: [decoded.id] } });
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist"),
      401
    );
  }

  req.user = freshUser;
  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  if (req.body.user_checked_phone) {
    const {
      user_name,
      user_checked_phone,
      user_address,
      user_password,
      user_passwordConfirm,
    } = req.body;

    if (user_password.length < 6)
      return next(
        new AppError("Password have to be at least 6 characters", 400)
      );
    if (user_password != user_passwordConfirm)
      return next(new AppError("Passwords are not the same", 400));

    const user = await Users.findOne({
      where: { user_phone: [user_checked_phone] },
    });

    if (user) {
      return next(new AppError("This number has already registered", 400));
    }

    const newUser = await Users.create({
      user_name,
      user_phone: user_checked_phone,
      user_password,
      user_address,
    });

    createSendToken(newUser, 201, res);
  } else {
    res.send(400).json({
      msg: "Firstly you have to verify your number",
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { user_name, user_phone, user_password } = req.body;

  if (!user_name || !user_phone || !user_password) {
    return next(
      new AppError(
        "Please provide correct username, phone number and password",
        400
      )
    );
  }

  const user = await Users.findOne({ where: { user_phone } });

  if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  createSendToken(user, 200, res);
});
