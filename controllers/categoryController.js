const { validationResult, body } = require("express-validator");

const Story = require("../models/story");
const Author = require("../models/author");
const Category = require("../models/category");

// Handle create category form on GET
exports.category_create_get = (req, res, next) => {
  Category.find()
    .select("name")
    .sort({ name: 1 })
    .exec((err, categories_list) => {
      if (err) next(err);

      res.render("category_form", {
        pageTitle: "New Category",
        sectionTitle: "Create Category",
        categories_list,
      });
    });
};

// Handle create category on POST
exports.category_create_post = [
  body("name")
    .toLowerCase()
    .isAlpha()
    .withMessage("Category name must contain only letters")
    .custom((value) => {
      return Category.findOne({ name: value }).then((category) => {
        if (category) throw new Error(`${category.name} already exist`);
      });
    }),

  (req, res, next) => {
    Category.find()
      .select("name")
      .sort({ name: 1 })
      .exec((err, categories_list) => {
        if (err) return next(err);

        const errors = validationResult(req);

        const category = new Category({
          name: req.body.name.toLowerCase(),
          authors: [],
          stories: [],
        });

        if (!errors.isEmpty()) {
          res.render("category_form", {
            pageTitle: "New Category",
            sectionTitle: "Create Category",
            categories_list,
            errors: errors.array(),
          });
          return;
        }

        category.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/story/catalog");
        });
      });
  },
];
