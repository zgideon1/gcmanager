const express = require("express");
const router = express.Router();
const { users } = require("../models");
const UserController = require("../controllers/UserController")

router.get("/users", 
  UserController.getUsers
);

router.get("/:id",
  UserController.getUser
);

module.exports = router;