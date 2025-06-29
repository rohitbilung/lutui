// server.js or routes/index.js
const express = require('express');
const router = express.Router();
const {
    houseOfDream,
    testHod,
    deleteHod,
    getHodById,
    getAllHod,
    updateHodById
} = require('../models/hod/hodModel');

router.post('/hod/join', houseOfDream);

router.get('/hod/', testHod);

router.delete('/hod/:id', deleteHod);

router.get('/hod/:id', getHodById);

router.get('/hods', getAllHod);

router.put('/hod/:id', updateHodById);

router.put('/hod/update/:id', )

module.exports = router;
