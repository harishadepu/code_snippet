import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  getSnippets,
  getSnippet,
  updateSnippet,
  deleteSnippet,
  forkSnippet,
} from "../controllers/snippetController.js";

const router = express.Router();

// GET all public snippets (optionally filtered)
router.get("/", getSnippets);

// POST a new snippet (authenticated)
router.post("/", protect, createSnippet);

// GET a single snippet by ID
router.get("/:id", getSnippet);

// PUT (update) a snippet by ID (authenticated + ownership check)
router.put("/:id", protect, updateSnippet);

// DELETE a snippet by ID (authenticated + ownership check)
router.delete("/:id", protect, deleteSnippet);

// POST to fork a snippet (authenticated)
router.post("/:id/fork", protect, forkSnippet);

export default router;