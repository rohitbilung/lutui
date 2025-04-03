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

router.post('/add-to-cart',isLoggedIn, addCart);

router.get('/get-cart-details/:userId',isLoggedIn, getCart);

router.post('/remove-an-item-from-cart',isLoggedIn, removeAnItemFromCart);

router.post('/remove-items-cart',isLoggedIn, removeProductCart);

router.post('/checkout',isLoggedIn, checkout);

module.exports = router;