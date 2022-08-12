const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({});

module.exports = mongoose.model("Story", storySchema);
