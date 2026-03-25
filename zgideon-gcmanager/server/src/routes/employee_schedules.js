const express = require("express");
const router = express.Router();
const EmployeeSchedulesController = require('../controllers/EmployeeSchedulesController')
const isAuthenticated = require("../policies/isAuthenticated")

router.get("/employeeschedules", 
  EmployeeSchedulesController.getSchedules
);

router.get("/employeeschedules/:id",
  EmployeeSchedulesController.getSchedule
)

router.post("/employeeschedules",
  isAuthenticated,
  EmployeeSchedulesController.createSchedule
);

router.put("/employeeschedules/:id",
    isAuthenticated,
    EmployeeSchedulesController.updateSchedule
)

router.delete("/employeeschedules/:id",
  isAuthenticated,
  EmployeeSchedulesController.deleteSchedule
)

module.exports = router;