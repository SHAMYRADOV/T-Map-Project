const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Etraps } = require("../../models");

exports.getAllEtraps = catchAsync(async (req, res, next) => {
  const etraps = await Etraps.findAll();

  return res.status(200).send(etraps);
});

exports.getEtrap = catchAsync(async (req, res, next) => {
  const etrap_id = req.params.id;
  const etrap = await Etraps.findOne({
    where: { etrap_id },
  });

  if (!etrap) {
    return next(new AppError("No etrap found with that ID", 404));
  }

  return res.status(200).send(etrap);
});

exports.addEtrap = catchAsync(async (req, res, next) => {
  const { etrap_name } = req.body;

  const newEtrap = await Etraps.create(req.body);

  return res.status(201).send(newEtrap);
});
