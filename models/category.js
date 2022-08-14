const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, trim: true, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: "Authors", required: true }],
  stories: [{ type: Schema.Types.ObjectId, ref: "Stories", required: true }],
});

categorySchema.virtual("url").get(function () {
  return "home/category/" + this._id;
});

module.exports = mongoose.model("Category", categorySchema);
