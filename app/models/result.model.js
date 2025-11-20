import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Result = SequelizeInstance.define("result", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  exercise_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  // Flexible measure fields - can represent different metrics depending on exercise type
  // Examples: weight, reps, sets, duration, distance, etc.
  resultMeasure1: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  resultMeasure2: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  resultMeasure3: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  // Additional flexible field for text/notes
  notes: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
});

export default Result;

