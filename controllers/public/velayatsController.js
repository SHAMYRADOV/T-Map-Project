const fs = require("fs");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Velayats } = require("../../models");

exports.getAllVelayats = catchAsync(async (req, res, next) => {
  const velayats = await Velayats.findAll();

  return res.status(200).send(velayats);
});

exports.getVelayat = catchAsync(async (req, res, next) => {
  const velayat_id = req.params.id;
  const velayat = await Velayats.findOne({
    where: { velayat_id },
  });

  if (!velayat) {
    return next(new AppError("No velayat found with that ID", 404));
  }

  return res.status(200).send(velayat);
});
