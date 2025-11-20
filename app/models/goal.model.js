import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Clean Goal model definition for tracking exercise progress per user.
// Fields: exerciseName (string), currentWeight (float), goalWeight (float), userId (FK -> user)
// All weights must be > 0.
const Goal = sequelize.define(
  "goal",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exerciseName: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    currentWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0.000001 },
    },
    goalWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0.000001 },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "goals",
    timestamps: true,
  }
);

export default Goal;
