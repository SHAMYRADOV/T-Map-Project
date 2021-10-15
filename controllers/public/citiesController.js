const catchAsync = require("../../utils/catchAsync");
const { Cities } = require("../../models/");
const AppError = require("../../utils/appError");

exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await Cities.findAll();

  return res.status(200).send(cities);
});

exports.getCity = catchAsync(async (req, res, next) => {
  const city_id = req.params.id;
  const city = await Cities.findOne({ where: { city_id } });

  if (!city) {
    return next(new AppError("No city found with that ID!", 404));
  }

  return res.status(200).send(city);
});
