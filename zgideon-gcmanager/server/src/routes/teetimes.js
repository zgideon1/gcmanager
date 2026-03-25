const express = require("express");
const router = express.Router();
const { teetimes } = require("../models");

const AuthenticationController = require("../controllers/AuthenticationController")
const TeeTimeController = require("../controllers/TeetimeController")
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/teetimes", 
  TeeTimeController.viewTeetimes
);

router.post("/teetimes", 
  TeeTimeController.bookTeetime
);

router.delete(`/teetimes/:teeid`,
  isAuthenticated,
  TeeTimeController.delete
)

module.exports = router;