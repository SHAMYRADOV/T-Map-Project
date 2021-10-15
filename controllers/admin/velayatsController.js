const fs = require("fs");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Velayats, Etraps, Cities } = require("../../models");

exports.getAllVelayats = catchAsync(async (req, res, next) => {
  const velayats = await Velayats.findAll({
    include: [
      {
        model: Etraps,
        as: "velayat_etraps",
      },
      {
        model: Cities,
        as: "velayat_cities",
      },
    ],
  });

  return res.status(200).send(velayats);
});

exports.getVelayat = catchAsync(async (req, res, next) => {
  const velayat_id = req.params.id;
  const velayat = await Velayats.findOne({
    include: [
      {
        model: Etraps,
        as: "velayat_etraps",
      },
      {
        model: Cities,
        as: "velayat_cities",
      },
    ],

    where: { velayat_id },
  });

  if (!velayat) {
    return next(new AppError("No velayat found with that ID", 404));
  }

  return res.status(200).send(velayat);
});

exports.addVelayat = catchAsync(async (req, res, next) => {
  const {
    velayat_name,
    velayat_territory,
    velayat_population,
    velayat_center,
  } = req.body;

  const newVelayat = await Velayats.create(req.body);

  return res.status(201).send(newVelayat);
});

exports.editVelayat = catchAsync(async (req, res, next) => {
  const velayat_id = req.params.id;
  const velayat = await Velayats.findOne({
    where: { velayat_id },
  });

  if (!velayat) {
    return next(new AppError("No velayat found with that ID", 404));
  }

  const {
    velayat_name,
    velayat_territory,
    velayat_population,
    velayat_center,
  } = req.body;
  if (
    typeof velayat_name != "string" ||
    typeof velayat_territory != "string" ||
    typeof velayat_center != "string" ||
    velayat_name.length < 1 ||
    velayat_territory.length < 1 ||
    velayat_center.length < 1
  )
    return next(new AppError("Invalid Credentials", 400));

  await velayat.update(req.body);

  return res.status(200).send(velayat);
});

exports.deleteVelayat = catchAsync(async (req, res, next) => {
  const velayat_id = req.params.id;
  const velayat = await Velayats.findOne({
    where: { velayat_id },
  });

  if (!velayat) {
    return next(new AppError("No velayat found with that ID", 404));
  }

  await velayat.destroy();

  return res.status(200).send("Successfully Deleted");
});
