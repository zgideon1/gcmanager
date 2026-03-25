const express = require("express");
const router = express.Router();
const TournamentsController = require('../controllers/TournamentsController')

router.get("/tournaments", 
  TournamentsController.getAll
);

router.get("/tournaments/:id",
  TournamentsController.get
)

router.post("/tournaments",
  TournamentsController.create
);

router.delete("/tournaments/:id",
  TournamentsController.delete
)

module.exports = router;