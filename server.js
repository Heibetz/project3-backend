
import routes from "./app/routes/index.js";
import express, { json, urlencoded } from "express"
import cors from "cors";

import db  from "./app/models/index.js";

// Alter existing tables to add new columns without losing data
// This is safer than force: true but may not work with all schema changes
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database schema updated successfully");
}).catch((err) => {
  console.error("Failed to update database schema:", err);
  // Fallback to force sync if alter fails
  console.log("Attempting force sync...");
  return db.sequelize.sync({ force: true });
}).then(() => {
  console.log("Database synced successfully");
}).catch((err) => {
  console.error("Failed to sync database:", err);
});

const app = express();

// Also use the cors middleware as backup
var corsOptions = {
  origin: "http://localhost:8081",
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
