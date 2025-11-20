import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";
<<<<<<< Updated upstream

// Models

=======
>>>>>>> Stashed changes
import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js"; 
import Exercise from "./exercise.model.js";
import ExercisePlan from "./exercisePlan.model.js";
import ExercisePlanExercise from "./exercisePlanExercise.model.js";
<<<<<<< Updated upstream

=======
import Goal from "./goal.model.js";
>>>>>>> Stashed changes

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.exercise = Exercise;
db.exercisePlan = ExercisePlan;
db.exercisePlanExercise = ExercisePlanExercise;
<<<<<<< Updated upstream

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

// foreign key for tutorials
db.user.hasMany(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tutorial.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for lessons
db.tutorial.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.tutorial,
  { as: "tutorial" },
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
=======
db.goal = Goal;

db.user.hasMany(db.session, { as: "session", foreignKey: { allowNull: false }, onDelete: "CASCADE" });
db.session.belongsTo(db.user, { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE" });

db.user.hasMany(db.tutorial, { as: "tutorial", foreignKey: { allowNull: false }, onDelete: "CASCADE" });
db.tutorial.belongsTo(db.user, { as: "user", foreignKey: { allowNull: false }, onDelete: "CASCADE" });

db.tutorial.hasMany(db.lesson, { as: "lesson", foreignKey: { allowNull: false }, onDelete: "CASCADE" });
db.lesson.belongsTo(db.tutorial, { as: "tutorial", foreignKey: { allowNull: false }, onDelete: "CASCADE" });

db.user.hasMany(db.exercise, { as: "exercises", foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" });
db.exercise.belongsTo(db.user, { as: "creator", foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" });

db.user.hasMany(db.exercisePlan, { as: "exercisePlans", foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" });
db.exercisePlan.belongsTo(db.user, { as: "creator", foreignKey: { name: "created_by", allowNull: false }, onDelete: "CASCADE" });

db.exercisePlan.belongsToMany(db.exercise, { through: db.exercisePlanExercise, foreignKey: "plan_id", otherKey: "exercise_id", as: "exercises" });
db.exercise.belongsToMany(db.exercisePlan, { through: db.exercisePlanExercise, foreignKey: "exercise_id", otherKey: "plan_id", as: "plans" });

db.user.hasMany(db.goal, { as: "goals", foreignKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });
db.goal.belongsTo(db.user, { as: "user", foreignKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });
>>>>>>> Stashed changes

export default db;
