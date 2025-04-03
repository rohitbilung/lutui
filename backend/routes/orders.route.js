const express = require('express');
const router = express.Router();
const { 
    addCart,
    getCart,
    removeProductCart
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')

router.post('/add-to-cart', addCart);

router.get('/get-cart-details/:userId', getCart);

router.post('/remove-items-cart/', removeProductCart);

module.exports = router;