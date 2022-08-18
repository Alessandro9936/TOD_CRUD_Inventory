const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Author = require("../models/author");

/**
 * @description called by passport.authenticate (login authentication) search for the user in database.
 * @param {String} username username coming from req.body
 * @param {String} password password coming from req.body
 * @param {Function} done verify callback responsible for continuing the authentication process, returning an error, failure or the authenticated user
 * @returns user if found, error message if input values don't correspond to values in database
 *
 */

const verifyCallback = async (username, password, done) => {
  try {
    const author = await Author.findByUsername(username);
    if (!author) return done(null, false, { message: "Username not found" });

    const isPasswordChecked = await bcrypt.compare(password, author.password);
    if (isPasswordChecked) {
      return done(null, author);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (err) {
    return done(err);
  }
};

// Create and set new strategy in middleware
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

// Add userID in session properties if login was succesfull
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Find user ID in session properties and cancel it
passport.deserializeUser(async (userId, done) => {
  try {
    const author = await Author.findById(userId);
    done(null, author);
  } catch (err) {
    done(err);
  }
});
