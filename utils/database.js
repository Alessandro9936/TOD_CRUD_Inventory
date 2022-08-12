const mongoose = require("mongoose");

function connectDB() {
  const dbLink =
    "mongodb+srv://alessandro:test123@storyinventory.bh9vq9x.mongodb.net/?retryWrites=true&w=majority";

  // Setup default mongoose connection
  mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true });

  // Get default connection
  const db = mongoose.connection;

  //bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console));

  console.log(db);

  return db;
}

module.exports = connectDB;
