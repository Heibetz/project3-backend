import { Sequelize } from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";
import User from "./user.model.js";
import Session from "./session.model.js";
import Tutorial from "./tutorial.model.js";
import Lesson from "./lesson.model.js";
import Exercise from "./exercise.model.js";
import Goal from "./goal.model.js";

// Models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = SequelizeInstance;

db.user = User;
db.session = Session;
db.tutorial = Tutorial;
db.lesson = Lesson;
db.exercise = Exercise;
db.goal = Goal;

// foreign key for session
db.user.hasMany(db.session, {
  as: "session",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});

// foreign key for tutorials
db.user.hasMany(db.tutorial, {
  as: "tutorial",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});
db.tutorial.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});

// foreign key for lessons
db.tutorial.hasMany(db.lesson, {
  as: "lesson",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});
db.lesson.belongsTo(db.tutorial, {
  as: "tutorial",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE"
});

// foreign key for exercises (created_by -> user)
db.user.hasMany(db.exercise, {
  as: "exercises",
  foreignKey: { name: "created_by", allowNull: false },
  onDelete: "CASCADE"
});
db.exercise.belongsTo(db.user, {
  as: "creator",
  foreignKey: { name: "created_by", allowNull: false },
  onDelete: "CASCADE"
});

// foreign key for goals
db.user.hasMany(db.goal, {
  as: "goals",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE"
});

db.goal.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE"
});

// Sync all models with database
await SequelizeInstance.sync();

export default db;
