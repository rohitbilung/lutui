// server.js or routes/index.js
const express = require('express');
const router = express.Router();
const {
    houseOfDream,
    testHod
} = require('../models/hod/hodModel');

router.post('/hod/join', houseOfDream);

router.get('/hod/', testHod);

module.exports = router;
