import exercisePlans from "../controllers/exercisePlan.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router();

// Create a new Exercise Plan
router.post("/", authenticate, exercisePlans.create);

// Retrieve all Exercise Plans
router.get("/", authenticate, exercisePlans.findAll);

// Retrieve a single Exercise Plan by id
router.get("/:id", authenticate, exercisePlans.findOne);

// Update an Exercise Plan by id
router.put("/:id", authenticate, exercisePlans.update);

// Delete an Exercise Plan by id
router.delete("/:id", authenticate, exercisePlans.delete);

// Add exercise to plan
router.post("/:id/exercises", authenticate, exercisePlans.addExercise);

// Remove exercise from plan
router.delete("/:planId/exercises/:exerciseId", authenticate, exercisePlans.removeExercise);

export default router;
