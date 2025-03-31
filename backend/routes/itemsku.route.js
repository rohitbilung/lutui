const express = require('express');
const router = express.Router();
const { 
    updateSku
 } = require('../controllers/itemsku.controller');
 const {auth} = require('../middlewares/auth')

router.put('/update-itemsku', updateSku);

module.exports = router;
