import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Goal = SequelizeInstance.define("goal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  targetDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default Goal;