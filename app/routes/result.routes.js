import results from "../controllers/result.controller.js";
// import authenticate from "../authorization/authorization.js";
// TODO: add auth middleware (guards)
import { Router } from "express";
var router = Router();

router.post("/", [], results.create);
router.get("/", [], results.findAll);
router.get(
  "/for-exercise/:exerciseId",
  results.findAllForExercise
);
router.get("/:id", [], results.findOne);
router.put("/:id", [], results.update);
router.delete("/:id", [], results.delete);

export default router;

