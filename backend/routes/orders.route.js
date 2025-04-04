const express = require('express');
const router = express.Router();
const { 
    addCart,
    getCart,
    removeAnItemFromCart,
    removeProductCart,
    checkout
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')
 const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/add-to-cart', addCart);

router.get('/get-cart-details/:userId', getCart);

router.post('/remove-an-item-from-cart', removeAnItemFromCart);

router.post('/remove-items-cart', removeProductCart);

router.post('/checkout', checkout);

module.exports = router;