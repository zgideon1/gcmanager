const express = require("express");
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController')
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/employees", 
  EmployeeController.getEmployees
);

router.get("/employees/:id",
  EmployeeController.getEmployee
)

router.post("/employees",
  isAuthenticated,
  EmployeeController.createEmployee
);

router.put("/employees/:id",
    isAuthenticated,
    EmployeeController.updateEmployee
)

router.delete("/employees/:id",
  isAuthenticated,
  EmployeeController.deleteEmployee
)

module.exports = router;