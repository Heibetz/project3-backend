import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Goal = SequelizeInstance.define("goal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  exercise_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  currentWeight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  goalWeight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
});

export default Goal;