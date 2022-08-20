const Story = require("../models/story");
const Author = require("../models/author");
const Category = require("../models/category");

const async = require("async");

// Show list of all stories

exports.story_list = (req, res, next) => {
  Story.find({})
    .populate({ path: "author" })
    .populate({ path: "category", select: "name" })
    .exec((err, list_story) => {
      if (err) {
        return next(err);
      }
      res.render("stories_list", {
        pageTitle: "Home",
        sectionTitle: "Stories",
        list_story,
      });
    });
};

// handle create story form on GET
exports.story_create_get = (req, res, next) => {
  Category.find({}).exec((err, category_list) => {
    if (err) return next(err);

    res.render("story_form", {
      pageTitle: "Create Story",
      sectionTitle: "Create Story",
      author: req.user,
      categories: category_list,
    });
  });
};

// Handle create story form on POST
exports.story_create_post = (req, res, next) => {
  const formatTitle = req.body.title
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const story = new Story({
    author: req.user,
    category: req.body.category,
    title: formatTitle,
    body: req.body.body,
  });
  story.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/story/catalog");
    }
  });
};
