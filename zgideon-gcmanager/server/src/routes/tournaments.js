const express = require("express");
const router = express.Router();
const TournamentsController = require('../controllers/TournamentsController')

router.get("/tournaments", 
  TournamentsController.getTournaments
);

router.get("/tournaments/:id",
  TournamentsController.getTournament
)

router.put("/tournaments/:id",
  TournamentsController.editTournament
)

router.post("/tournaments",
  TournamentsController.createTournament
);

router.delete("/tournaments/:id",
  TournamentsController.deleteTournament
)

module.exports = router;