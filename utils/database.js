require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  const dbLink = process.env.DB;

  // Setup default mongoose connection
  mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

  // Get default connection
  const db = mongoose.connection;

  //bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console));

  return db;
}

module.exports = connectDB;
