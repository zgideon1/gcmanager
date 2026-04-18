const express = require("express");
const router = express.Router();

const ScorecardController = require('../controllers/ScorecardController');
const isAuthenticated = require("../policies/isAuthenticated")

router.get('/scorecards',
    ScorecardController.viewScorecards
)

router.get('/scorecards/:id',
    ScorecardController.viewScorecard
)

router.post('/scorecards',
    ScorecardController.postScorecard
)

router.put('/scorecards/:id',
    ScorecardController.editScorecard
)

router.delete('/scorecards/:id',
    isAuthenticated,
    ScorecardController.deleteScorecard
)

module.exports = router