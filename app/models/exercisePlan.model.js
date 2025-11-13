import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const ExercisePlan = SequelizeInstance.define("exercisePlan", {
  plan_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  is_standard: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  day: {
    type: Sequelize.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
    allowNull: true,
  },
});

export default ExercisePlan;
