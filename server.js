
import routes from "./app/routes/index.js";
import express, { json, urlencoded } from "express"
import cors from "cors";

import db  from "./app/models/index.js";

// Only sync database in development - DO NOT use alter/force in production!
if (process.env.NODE_ENV !== 'production') {
  db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database schema updated successfully (DEV MODE)");
  }).catch((err) => {
    console.error("Failed to update database schema:", err);
  });
} else {
  // In production, just authenticate the connection
  db.sequelize.authenticate().then(() => {
    console.log("Database connection established successfully (PRODUCTION MODE)");
  }).catch((err) => {
    console.error("Unable to connect to database:", err);
  });
}

const app = express();

// Configure CORS - works locally and in production
const allowedOrigins = [
  "http://localhost:8081",
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

var corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : "http://localhost:8081",
  credentials: true
}
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
  
// Load the routes from the routes folder
app.use("/tracker-t5", routes); 


// set port, listen for requests
const PORT = process.env.PORT || 3125;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

export default app;
