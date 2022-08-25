require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const path = require("path");
const createError = require("http-errors");

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");

// Require Routes

const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
const storyRouter = require("./routes/storyRoutes");
const categoryRouter = require("./routes/categoryRoutes");

/* ---------------- EXPRESS APP  ----------------*/

const app = express();
app.listen(process.env.PORT || 3000);

const db = require("./utils/database")();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(morgan("tiny"));

/* ---------------- SESSION SETUP ----------------*/

// structure of sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB,
      collectionName: "sessions",
    }),
  })
);

/* ----------------  PASSPORT AUTHENTICATION ----------------*/

// Need to require the entire Passport config module so app.js knows about it
require("./utils/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
/* ---------------- ROUTES ----------------*/

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/story", storyRouter);
app.use("/category", categoryRouter);

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
