import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import TutorialRoutes from "./tutorial.routes.js";
import LessonRoutes from "./lesson.routes.js";
import ExerciseRoutes from "./exercise.routes.js";
import ResultRoutes from "./result.routes.js";
import ExercisePlanRoutes from "./exercisePlan.routes.js";
import GoalRoutes from "./goal.routes.js";


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/tutorials", TutorialRoutes);
router.use("/tutorials", LessonRoutes);
router.use("/exercises", ExerciseRoutes);
router.use("/results", ResultRoutes);
router.use("/exercise-plans", ExercisePlanRoutes);
router.use("/goals", GoalRoutes);

export default router;
