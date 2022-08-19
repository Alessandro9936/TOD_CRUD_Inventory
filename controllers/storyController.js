const Story = require("../models/story");
const Author = require("../models/author");
const Category = require("../models/category");

const async = require("async");

exports.story_list = (req, res, next) => {
  Story.find({})
    .populate({ path: "author", select: "username birth_date" })
    .populate({ path: "category", select: "name" })
    .exec((err, list_story) => {
      if (err) {
        return next(err);
      }
      console.log(list_story);
      res.render("stories_list", {
        pageTitle: "Home",
        sectionTitle: "Stories",
        list_story,
      });
    });
};
