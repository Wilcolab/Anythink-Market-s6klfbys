/**
 * Express router for comment endpoints
 * @type {Router}
 */

/**
 * Retrieves all comments
 * @async
 * @route GET /
 * @returns {Promise<void>} JSON array of all comments
 * @throws {500} Failed to fetch comments
 */

/**
 * Deletes a comment by ID
 * @async
 * @route DELETE /:id
 * @param {string} req.params.id - The comment ID to delete
 * @returns {Promise<void>} Success message upon deletion
 * @throws {400} Invalid comment ID format
 * @throws {404} Comment not found
 * @throws {500} Failed to delete comment
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid comment ID" });
        }

        const deletedComment = await Comment.findByIdAndDelete(id);
        
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});
