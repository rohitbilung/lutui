const express = require('express');
const router = express.Router();
const { 
    addCart,
    getCart,
    removeCountFromCart,
    removeProductFromCart,
    checkout,
    getOrders
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')
 const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/add-to-cart', addCart);

router.get('/get-cart-details/:userId', getCart);

router.post('/remove-count-from-cart', removeCountFromCart); //this will remove the count of item

router.post('/remove-item-from-cart', removeProductFromCart); //this will remove the items

router.post('/checkout', checkout);

router.post('/get-orders', getOrders);

module.exports = router;