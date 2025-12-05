import goals from "../controllers/goal.controller.js";
import { Router } from "express";
import authenticate from "../authorization/authorization.js";
var router = Router();

router.post("/", authenticate, goals.create);
router.get("/", goals.findAll);
router.get("/:id", goals.findOne);
router.put("/:id", authenticate, goals.update);
router.delete("/:id", authenticate, goals.delete);

export default router;