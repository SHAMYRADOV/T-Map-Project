const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/users", require("./routes/user/usersRouter"));
app.use("/admin", require("./routes/admin/adminRouter"));
app.use("/public", require("./routes/public/publicRouter"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require("./controllers/errorController"));

module.exports = app;
