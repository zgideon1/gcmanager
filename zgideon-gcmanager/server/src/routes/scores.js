const express = require("express");
const router = express.Router();

const ScoresController = require('../controllers/ScoresController');
const isAuthenticated = require("../policies/isAuthenticated")

router.get(
  "/scores", 
  ScoresController.viewScores
);

router.post(
  "/scores", 
  ScoresController.postScore
);

router.put(
  '/scorecards/:id',
  isAuthenticated,
  ScoresController.editScore
)

router.delete(
  '/scorecards/:id',
  isAuthenticated,
  ScoresController.deleteScore
)

module.exports = router;