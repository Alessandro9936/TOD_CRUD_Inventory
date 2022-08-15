const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/", (req, res, next) => res.redirect("/account/login"));

// login form GET
router.get("/login", accountController.account_form_get);

// login form POST
router.post("/login");

// register form GET
router.get("/register");

// register form POST
router.post("/register");

module.exports = router;
