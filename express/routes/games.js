const express = require('express');
const router = express.Router();
const pool = require('../db');
const userAuthMiddleware = require('../AuthMiddleware');

router.post('/submit-game', userAuthMiddleware, gameController.submitGame);


module.exports = router;