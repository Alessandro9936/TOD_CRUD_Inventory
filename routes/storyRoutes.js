const express = require("express");
const router = express.Router();

const storyController = require("../controllers/storyController");
// STORIES

// GET request for creating a story
router.get("/create", storyController.story_create_get);

// POST request for creating a story
router.post("/create", storyController.story_create_post);

// GET request for updating a story
router.get("/:id/update", storyController.story_update_get);

// POST request for updating a story
router.post("/:id/update", storyController.story_update_post);

// GET request for deleting a story
router.post("/:id/delete", storyController.story_delete_post);

// GET request for all storyies
router.get("/catalog", storyController.story_list);

// GET request for one story
router.get("/:id", storyController.story_detail);

module.exports = router;
