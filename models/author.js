const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({});

module.exports = mongoose.model("Author", authorSchema);
