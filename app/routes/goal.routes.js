import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import * as goals from "../controllers/goal.controller.js";

const router = Router();

// Create a new Goal
router.post("/", authenticate, goals.create);

// Retrieve all Goals
router.get("/", authenticate, goals.findAll);

// Retrieve a single Goal with id
router.get("/:id", authenticate, goals.findOne);

// Update a Goal with id
router.put("/:id", authenticate, goals.update);

// Delete a Goal with id
router.delete("/:id", authenticate, goals.delete);

export default router;