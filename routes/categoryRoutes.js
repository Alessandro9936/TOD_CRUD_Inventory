const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
// CATEGORIES

// GET request for creating a category
router.get("/create", categoryController.category_create_get);

// POST request for creating a category
router.post("/create", categoryController.category_create_post);

// GET request for updating a category
router.get("/:id/update");

// POST request for updating a category
router.post("/:id/update");

// GET request for deleting a category
router.get("/:id/delete");

// GET request for deleting a category
router.post("/:id/delete");

// GET request for one category
router.get("/:id");

module.exports = router;
