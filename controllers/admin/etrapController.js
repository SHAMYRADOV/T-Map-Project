const sharp = require("sharp");
const multer = require("multer");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Etraps, Velayats, Cities } = require("../../models");

exports.getAllEtraps = catchAsync(async (req, res, next) => {
  const etraps = await Etraps.findAll({
    include: [
      {
        model: Velayats,
        as: "velayat",
      },
      {
        model: Cities,
        as: "etrap_cities",
      },
    ],
  });

  return res.status(200).send(etraps);
});

exports.getEtrap = catchAsync(async (req, res, next) => {
  const etrap_id = req.params.id;
  const etrap = await Etraps.findOne({
    include: {
      model: Velayats,
      as: "velayat",
    },
    where: { etrap_id },
  });

  if (!etrap) {
    return next(new AppError("No etrap found with that ID", 404));
  }

  return res.status(200).send(etrap);
});

exports.addEtrap = catchAsync(async (req, res, next) => {
  const { etrap_name, velayatId } = req.body;
  const newEtrap = await Etraps.create(req.body);

  return res.status(201).send(newEtrap);
});

exports.editEtrap = catchAsync(async (req, res, next) => {
  const etrap_id = req.params.id;
  const etrap = await Etraps.findOne({
    where: { etrap_id },
  });

  if (!etrap) {
    return next(new AppError("No etrap found with that ID", 404));
  }

  const { etrap_name } = req.body;
  if (typeof etrap_name != "string" || etrap_name.length < 1)
    return next(new AppError("Invalid Credentials", 400));

  await etrap.update(req.body);

  return res.status(200).send(etrap);
});

exports.deleteEtrap = catchAsync(async (req, res, next) => {
  const etrap_id = req.params.id;
  const etrap = await Etraps.findOne({
    where: { etrap_id },
  });

  if (!etrap) {
    return next(new AppError("No etrap found with that ID", 404));
  }

  await etrap.destroy();

  return res.status(200).send("Successfully Deleted");
});

// Multer Properties
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPhoto = upload.single("photo");

exports.uploadEtrapImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Please provide etrap image", 404));

  const etrap_id = req.params.id;
  const etrap = await Etraps.findOne({
    include: {
      model: Velayats,
      as: "velayat",
    },
    where: { etrap_id },
  });

  if (!etrap)
    return next(new AppError("Etrap did not found with that ID", 404));

  const etrap_image = `${etrap_id}.webp`;

  await sharp(req.file.buffer)
    .toFormat("webp")
    .webp({ quality: 70 })
    .toFile(`public/${etrap_image}`);

  await etrap.update({
    etrap_image,
  });

  return res.status(201).send(etrap);
});
