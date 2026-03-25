const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController")

router.get("/roles", 
  RoleController.getRoles
);

router.get("/:id",
  RoleController.getRole
);

module.exports = router;