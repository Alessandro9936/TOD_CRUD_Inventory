const express = require("express");
const router = express.Router();

const storyController = require("../controllers/storyController");
const authorController = require("../controllers/authorController");
const categoryController = require("../controllers/categoryController");

// STORY

// display home

router.get("/", storyController.index);

// create story GET

router.get("/story/create", storyController_create_get);

// create story POST

router.post("/story/create");

// delete story GET

router.get("story/:id/delete");

// delete story POST

router.post("story/:id/delete");

// update story GET

router.get("story/:id/update");

// update story POST

router.post("story/:id/update");

// get story details

router.get("/story/:id");

// get all stories

router.get("/stories");

// AUTHOR

// create author GET

router.get("/author/create");

// create author POST

router.post("/author/create");

// delete author GET

router.get("author/:id/delete");

// delete author POST

router.post("author/:id/delete");

// update author GET

router.get("author/:id/update");

// update author POST

router.post("author/:id/update");

// get author details

router.get("/author/:id");

// get all authors

router.get("/authors");

// CATEGORY

// create category GET

router.get("/category/create");

// create category POST

router.post("/category/create");

// delete category GET

router.get("category/:id/delete");

// delete category POST

router.post("category/:id/delete");

// update category GET

router.get("category/:id/update");

// update category POST

router.post("category/:id/update");

// get category details

router.get("/category/:id");

// get all categories

router.get("/categories");

module.exports = router;
