const connectToDB = require("./utils/database");

const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const createError = require("http-errors");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.listen(3000);
const db = connectToDB();

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const catalogRouter = require("./routes/catalog");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/account", accountRouter);
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
