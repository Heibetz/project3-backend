  import users from "../controllers/user.controller.js";
  import  authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()


  // Create a new User
  router.post("/", users.create);

  // Retrieve all People
  router.get("/", users.findAll);

  // Retrieve a single User with email
  router.get("/email/:email", users.findByEmail);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);


  export default router;

