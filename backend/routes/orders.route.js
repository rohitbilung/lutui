const express = require('express');
const router = express.Router();
const { 
    addCart
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')

router.post('/add-to-cart', addCart);

module.exports = router;
