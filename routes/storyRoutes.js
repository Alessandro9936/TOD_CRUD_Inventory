const express = require("express");
const router = express.Router();

const storyController = require("../controllers/storyController");
// STORIES

// GET request for creating a story
router.get("/create", storyController.story_create_get);

// POST request for creating a story
router.post("/create", storyController.story_create_post);

// GET request for updating a story
router.get("/:id/update");

// POST request for updating a story
router.post("/:id/update");

// GET request for deleting a story
router.get("/:id/delete");

// GET request for deleting a story
router.post("/:id/delete");

// GET request for all storyies
router.get("/catalog", storyController.story_list);

// GET request for one story
router.get("/:id", storyController.story_detail);

module.exports = router;
