const { Op } = require("sequelize");
const catchAsync = require("../../utils/catchAsync");
const { Cities } = require("../../models/");

const capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.searchCities = catchAsync(async (req, res, next) => {
  let { keyword } = req.query;
  let keywordsArray = [];
  keyword = keyword.toLowerCase();
  keywordsArray.push("%" + keyword + "%");
  keyword = "%" + capitalize(keyword) + "%";
  keywordsArray.push(keyword);

  const cities = await Cities.findAll({
    where: {
      [Op.or]: [
        {
          city_name: {
            [Op.like]: {
              [Op.any]: keywordsArray,
            },
          },
        },
      ],
      //   isActive: true,
    },
  });

  //   const cities = await Cities.findAll({});

  return res.status(200).send(cities);
});
