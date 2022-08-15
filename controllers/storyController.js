const Author = require("../models/author");
const Story = require("../models/story");
const Category = require("../models/category");

exports.index = (req, res) => {};

// display all storys
exports.story_list = (req, res) => {};

// display detail of a specific story
exports.story_detail = (req, res) => {};

// display story create form on GET
exports.story_create_get = (req, res) => {};

// handle create story on POST
exports.story_create_post = (req, res) => {};

// display story update form on GET
exports.story_update_get = (req, res) => {};

// handle update story on POST
exports.story_update_post = (req, res) => {};

// display story delete form on GET
exports.story_delete_get = (req, res) => {};

// handle delete story on POST
exports.story_delete_post = (req, res) => {};
