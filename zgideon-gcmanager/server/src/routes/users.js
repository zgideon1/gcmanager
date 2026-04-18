const express = require("express");
const router = express.Router();
const { users } = require("../models");

const AuthenticationController = require("../controllers/AuthenticationController")
const UserPolicy = require("../policies/UserPolicy")
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/users", 
  AuthenticationController.getUsers
);

router.get("/users/:uid",
  AuthenticationController.getUser
);

router.post(
  "/users",
  isAuthenticated,
  UserPolicy.register,
  AuthenticationController.register
)

router.put(
  "/users/:uid",
  isAuthenticated,
  AuthenticationController.editUser
)

router.delete(
  "/users/:uid",
  isAuthenticated,
  AuthenticationController.deleteUser
)

module.exports = router;