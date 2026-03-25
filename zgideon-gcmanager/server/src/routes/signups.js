const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/AuthenticationController")
const SignupsController = require("../controllers/SignupsController")
const isAuthenticated = require("../policies/isAuthenticated")


module.exports = router;