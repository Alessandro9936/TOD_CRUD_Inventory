require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");

const path = require("path");
const createError = require("http-errors");

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");

// Require Routes

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const storyRouter = require("./routes/storyRoutes");

/* ---------------- EXPRESS APP  ----------------*/

const app = express();
app.listen(3000);

const db = require("./utils/database")();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(morgan("tiny"));

/* ---------------- SESSION SETUP ----------------*/

// define where store sessions in database
const sessionStore = MongoStore.create({
  dbName: "sessions",
  mongoUrl: process.env.DB,
  collectionName: "sessions",
});

// structure of sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

/* ----------------  PASSPORT AUTHENTICATION ----------------*/

// Need to require the entire Passport config module so app.js knows about it
require("./utils/passport");
app.use(passport.initialize());
app.use(passport.session());
/* ---------------- ROUTES ----------------*/

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/story", storyRouter);

/* ---------------- ERROR HANDLER ----------------*/

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
