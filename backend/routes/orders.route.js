const express = require('express');
const router = express.Router();
const { 
    addCart,
    getCart
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')

router.post('/add-to-cart', addCart);

router.get('/get-cart-details/:userId', getCart);

module.exports = router;
