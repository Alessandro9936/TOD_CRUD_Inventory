const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

// login form GET
router.get("/login", accountController.account_form_get);

// login form POST
router.post("/login", accountController.account_form_post);

// register form GET
router.get("/register", accountController.register_form_get);

// register form POST
router.post("/register", accountController.register_form_post);

// show users profile details
router.get("/profile/:id", accountController.account_details);

// handle profile logout
router.get("/log-out", accountController.account_logout);

module.exports = router;
