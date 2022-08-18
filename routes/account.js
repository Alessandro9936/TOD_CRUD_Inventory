const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/", (req, res, next) => res.redirect("/account/login"));

// login form GET
router.get("/login", accountController.account_form_get);

// login form POST
router.post("/login", accountController.account_form_post);

// register form GET
router.get("/register", accountController.register_form_get);

// register form POST
router.post("/register", accountController.register_form_post);

module.exports = router;
