import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Exercise from "./exercise.model.js";
import Result from "./result.model.js";
import ExercisePlan from "./exercisePlan.model.js";
import ExercisePlanExercise from "./exercisePlanExercise.model.js";
import Goal from "./goal.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.exercise = Exercise;
db.result = Result;
db.exercisePlan = ExercisePlan;
db.exercisePlanExercise = ExercisePlanExercise;
db.goal = Goal;

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for exercises (created_by -> user)
db.user.hasMany(
  db.exercise,
  { as: "exercises" },
  { foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" }
);
db.exercise.belongsTo(
  db.user,
  { as: "creator" },
  { foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for results (user_id -> user)
db.user.hasMany(
  db.result,
  { as: "results" },
  { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE" }
);
db.result.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { name: "user_id", allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for results (exercise_id -> exercise)
db.exercise.hasMany(
  db.result,
  { as: "results" },
  { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" }
);
db.result.belongsTo(
  db.exercise,
  { as: "exercise" },
  { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for exercise plans (created_by -> user)
db.user.hasMany(
  db.exercisePlan,
  { as: "exercisePlans" },
  { foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" }
);
db.exercisePlan.belongsTo(
  db.user,
  { as: "creator" },
  { foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" }
);

// many-to-many relationship: ExercisePlan has many Exercises
db.exercisePlan.belongsToMany(
  db.exercise,
  { 
    through: db.exercisePlanExercise,
    foreignKey: "plan_id",
    otherKey: "exercise_id",
    as: "exercises"
  }
);
db.exercise.belongsToMany(
  db.exercisePlan,
  { 
    through: db.exercisePlanExercise,
    foreignKey: "exercise_id",
    otherKey: "plan_id",
    as: "plans"
  }
);

// foreign key for goals (exercise_id -> exercise)
db.exercise.hasMany(
  db.goal,
  { as: "goals" },
  { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" }
);
db.goal.belongsTo(
  db.exercise,
  { as: "exercise" },
  { foreignKey: { name: "exercise_id", allowNull: false }, onDelete: "CASCADE" }
);

export default db;
