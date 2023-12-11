const express = require('express');
const router = express.Router();
const pool = require('../db');
const userAuthMiddleware = require('../AuthMiddleware');
const gameController = require('../controllers/gameController');

router.post('/submit-game', userAuthMiddleware, gameController.submitGame);

// router.get('/character-stats', userAuthMiddleware, gameController.getCharacterStats);


module.exports = router;