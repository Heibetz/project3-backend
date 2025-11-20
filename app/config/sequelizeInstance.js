import dbConfig from "./db.config.js";
import Sequelize from "sequelize";

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  // Reduce console noise: disable SQL logging by default. Set ENABLE_SQL_LOG=1 to re-enable.
  logging: process.env.ENABLE_SQL_LOG === '1' ? console.log : false,
  },
);


export default sequelize;