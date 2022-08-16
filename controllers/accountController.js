const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Author = require("../models/author");

// display login form on GET
exports.account_form_get = (req, res) => {
  res.render("login_form");
};

// Handle login form on POST

// display register form on GET
exports.register_form_get = (req, res) => {
  res.render("register_form");
};

// Handle register form on POST
exports.register_form_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name field must not be empty")
    .isAlpha()
    .withMessage("First name must contain only letters")
    .escape(),
  body("last_name")
    .notEmpty()
    .isAlpha()
    .withMessage("Second name must contain only letters")
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
    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const author = new Author({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      date_birth: req.body.birth_date,
      sex: req.body.sex,
      password: hashedPassword,
    });

    if (!errors.isEmpty()) {
      res.render("register_form", {
        author,
        errors: errors.array(),
      });
      return;
    }

    author.save((err) => {
      if (err) {
        return next(err);
      }
    });
    // Redirect to home page
    res.redirect("/");
  },
];
