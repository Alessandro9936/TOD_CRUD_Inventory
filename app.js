const connectToDB = require("./utils/database");

const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const createError = require("http-errors");

const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");

const app = express();
const db = connectToDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/home", catalogRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
