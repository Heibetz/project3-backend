import exercises from "../controllers/exercise.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";
var router = Router();

// Create a new Exercise
router.post("/", exercises.create);

// Retrieve all Exercises
router.get("/", exercises.findAll);

// Retrieve a single Exercise by id
router.get("/:id", exercises.findOne);

// Update an Exercise by id
router.put("/:id", exercises.update);

// Delete an Exercise by id
router.delete("/:id", exercises.delete);

export default router;
