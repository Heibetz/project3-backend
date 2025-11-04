import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise", {
  exercise_id: {
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
  type: {
    type: Sequelize.ENUM("Standard", "Custom"),
    allowNull: false,
    defaultValue: "Standard",
  },
  created_by: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Exercise;
