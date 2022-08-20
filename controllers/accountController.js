const passport = require("passport");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Author = require("../models/author");

// display login form on GET
exports.account_form_get = (req, res) => {
  res.render("login_form");
};

// Handle login form on POST
exports.account_form_post = (req, res, next) => {
  // passport.authenticate is called when the user try to login through a form
  // it looks at the request body for parameters named username and password then runs the LocalStrategy function to see if the username and password are in the database
  // it then creates a session cookie that gets stored in the database
  // redirect to different routes whether the login is a success or failure

  // doesn't perform the authentication right away, it returns a middleware. To make it works the middleware returned must be invoked.
  passport.authenticate("local", {
    successRedirect: "/story/catalog",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
};

// display register form on GET
exports.register_form_get = (req, res) => {
  res.render("register_form");
};

// Handle register form on POST
exports.register_form_post = [
  //Validation and sanitize form inputs
  body("username")
    .notEmpty()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .custom((value) => {
      return Author.findByUsername(value).then((author) => {
        if (author) throw new Error(`${author.username} is already in use`);
      });
    })
    .escape(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .custom((value) => {
      return Author.findByEmail(value).then((author) => {
        if (author) throw new Error(`${author.email} is already in use`);
      });
    }),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be greater than 6 and contain at least one uppercase letter, one number and one symbol"
    ),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  async (req, res, next) => {
    // Check if validation returned any error
    const errors = validationResult(req);

    // Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new author
    const author = new Author({
      username: req.body.username,
      email: req.body.email,
      date_birth: req.body.birth_date,
      sex: req.body.sex,
      password: hashedPassword,
    });

    // If validationResult returned an error render again the form with client input values and display errors

    if (!errors.isEmpty()) {
      res.render("register_form", {
        author,
        errors: errors.array(),
      });
      return;
    }

    // If there are no errors save the author in database and redirect to home page
    author.save((err) => {
      if (err) {
        return next(err);
      }
    });

    // Redirect to home page
    res.redirect("/home");
  },
];
