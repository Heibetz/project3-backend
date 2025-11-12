import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const ExercisePlanExercise = SequelizeInstance.define("exercisePlanExercise", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  plan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  exercise_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  sets: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 3,
  },
  reps: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 10,
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default ExercisePlanExercise;
