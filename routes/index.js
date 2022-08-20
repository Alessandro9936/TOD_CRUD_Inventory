const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/story/catalog");
  } else {
    res.redirect("/account/login");
  }
});

module.exports = router;
