const catchAsync = require("../../utils/catchAsync");
const { Cities, Etraps, Citiesandetraps } = require("../../models/");
const AppError = require("../../utils/appError");

exports.getAllCities = catchAsync(async (req, res, next) => {
  const cities = await Cities.findAll({
    include: { model: Etraps, as: "city_etraps" },
  });

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

exports.addCity = catchAsync(async (req, res, next) => {
  const newCity = await Cities.create(req.body);

  const etrap = await Etraps.findOne({ where: { id: req.body.etrapId } });
  if (!etrap) {
    return next(new AppError("Not any etrap found with that id", 404));
  }

  await Citiesandetraps.create({ cityId: newCity.id, etrapId: etrap.id });

  return res.status(201).send(newCity);
});

exports.editCity = catchAsync(async (req, res, next) => {
  const city_id = req.params.id;
  const city = await Cities.findOne({
    where: { city_id },
  });

  if (!city) {
    return next(new AppError("No city found with that id", 404));
  }

  const { city_name, city_territory, city_schools } = req.body;

  if (
    typeof city_name != "string" ||
    typeof city_territory != "string" ||
    typeof city_schools != "string" ||
    city_name.length < 1 ||
    city_territory.length < 1 ||
    city_schools.length < 1
  )
    return next(new AppError("Invalid Credentials", 400));

  await city.update(req.body);

  return res.status(200).send(city);
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  const city_id = req.params.id;
  const city = await Cities.findOne({
    where: { city_id },
  });

  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }

  await city.destroy();

  return res.status(200).send("Successfully Deleted");
});
