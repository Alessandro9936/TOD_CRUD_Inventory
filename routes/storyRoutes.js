const express = require("express");
const router = express.Router();

const storyController = require("../controllers/storyController");
// STORIES

// GET request for creating a story
router.get("/create");

// POST request for creating a story
router.post("/create");

// GET request for updating a story
router.get("/:id/update");

// POST request for updating a story
router.post("/:id/update");

// GET request for deleting a story
router.get("/:id/delete");

// GET request for deleting a story
router.post("/:id/delete");

// GET request for one story
router.get("/:id");

// GET request for all storyies
router.get("/catalog", storyController.story_list);

module.exports = router;
