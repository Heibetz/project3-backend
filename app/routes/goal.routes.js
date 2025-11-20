import { Router } from "express";
import authenticate from "../authorization/authorization.js";
import controller from "../controllers/goal.controller.js";

const router = Router();

// Create a new Goal
router.post("/", authenticate, controller.create);
// Retrieve all Goals
router.get("/", authenticate, controller.findAll);
// Retrieve a single Goal with id
router.get("/:id", authenticate, controller.findOne);
// Update a Goal with id
router.put("/:id", authenticate, controller.update);
// Delete a Goal with id
router.delete("/:id", authenticate, controller.delete);

export default router;