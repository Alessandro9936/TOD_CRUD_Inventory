const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    category: String, // Temporary before implementing creation of new categories
    //category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

storySchema.virtual("formatted_created_date").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

storySchema.virtual("formatted_updated_date").get(function () {
  return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATE_MED);
});

storySchema.virtual("url").get(function () {
  return "/home/story/" + this._id;
});

module.exports = mongoose.model("Story", storySchema);
