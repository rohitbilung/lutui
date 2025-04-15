// server.js or routes/index.js
const express = require('express');
const router = express.Router();
const {
    visitCount
} = require('../models/visits/visitModel');

router.get('/', visitCount);

module.exports = router;
