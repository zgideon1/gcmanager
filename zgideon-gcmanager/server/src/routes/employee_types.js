const express = require("express");
const router = express.Router();
const EmployeeTypeController = require('../controllers/EmployeeTypeController')
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/employee_types", 
  EmployeeTypeController.getEmployeeTypes
);

router.get("/employee_types/:id",
  EmployeeTypeController.getEmployeeType
)

router.post("/employee_type",
  isAuthenticated,
  EmployeeTypeController.createEmployeeType
);

router.put("/employee_type/:id",
    isAuthenticated,
    EmployeeTypeController.updateEmployeeType
)

router.delete("/employee_type/:id",
  isAuthenticated,
  EmployeeTypeController.deleteEmployeeType
)

module.exports = router;