const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  first_name: { type: String, trim: true, required: true },
  last_name: { type: String, trim: true },
  email: { type: String, trim: true, required: true },
  date_birth: { type: Date },
  sex: { type: String, enum: ["male", "female", "other"] },
  password: { type: String, trim: true, required: true },
  membership_status: { type: Boolean, required: true, default: false },
});

authorSchema.virtual("url").get(function () {
  return "home/author/" + this._id;
});

authorSchema.virtual("formatted_birthDate").get(function () {
  return DateTime.fromJSDate(this.date_birth).toLocaleString(DateTime.DATE_MED);
});

authorSchema.virtual("full_name").get(function () {
  return this.first_name + this.last_name;
});

authorSchema.statics.findByEmail = function (emailInput) {
  return this.findOne({ email: emailInput });
};

module.exports = mongoose.model("Author", authorSchema);
