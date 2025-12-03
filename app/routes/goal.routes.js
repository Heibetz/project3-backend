import goals from "../controllers/goal.controller.js";
import { Router } from "express";
var router = Router();

router.post("/", goals.create);
router.get("/", goals.findAll);
router.get("/:id", goals.findOne);
router.put("/:id", goals.update);
router.delete("/:id", goals.delete);

export default router;