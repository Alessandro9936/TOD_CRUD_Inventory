const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const authorSchema = new Schema({
  username: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  date_birth: { type: Date },
  sex: { type: String, enum: ["male", "female", "other"] },
  password: { type: String, trim: true, required: true },
  membership_status: { type: Boolean, required: true, default: false },
});

authorSchema.virtual("url").get(function () {
  return "/account/profile/" + this._id;
});

authorSchema.virtual("formatted_birthDate").get(function () {
  return DateTime.fromJSDate(this.date_birth).toLocaleString(DateTime.DATE_MED);
});

authorSchema.virtual("birthDate_forms").get(function () {
  return DateTime.fromJSDate(this.date_birth).toFormat("yyyy-MM-dd");
});

authorSchema.statics.findByUsername = function (usernameInput) {
  return this.findOne({ username: usernameInput });
};

authorSchema.statics.findByEmail = function (emailInput) {
  return this.findOne({ email: emailInput });
};

module.exports = mongoose.model("Author", authorSchema);
