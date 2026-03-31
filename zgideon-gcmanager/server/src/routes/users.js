const express = require("express");
const router = express.Router();
const { users } = require("../models");
const AuthenticationController = require("../controllers/AuthenticationController")
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/users", 
  AuthenticationController.getUsers
);

router.get("/users/:uid",
  AuthenticationController.getUser
);

module.exports = router;