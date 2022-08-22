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

  Category.findOne({ name: req.body.category }).exec((err, category) => {
    const story = new Story({
      author: req.user,
      category: category._id,
      title: formatTitle,
      body: req.body.body,
    });

    category.update({ $push: { stories: story } }).exec();

    if (!category.authors.find((author) => author.name === req.user.name)) {
      category.update({ $push: { authors: req.user } }).exec();
    }

    story.save((err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/story/catalog");
      }
    });
  });
};

// Handle display story details

exports.story_detail = (req, res, next) => {
  Story.findById({ _id: req.params.id })
    .populate("author")
    .populate("category")
    .exec((err, story) => {
      if (err) return next(err);

      res.render("story_details", {
        pageTitle: "Story Detail",
        sectionTitle: "Story Detail",
        story,
      });
    });
};
