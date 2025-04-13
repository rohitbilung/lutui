const express = require('express');
const router = express.Router();
const { 
    addCart,
    getCart,
    removeCountFromCart,
    removeProductFromCart,
    checkout,
    getOrders,
    updateOrders
 } = require('../controllers/orders.controller');
 const {auth} = require('../middlewares/auth')
 const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/add-to-cart',isLoggedIn, addCart);

router.get('/get-cart-details/:userId',isLoggedIn, getCart);

router.post('/remove-count-from-cart',isLoggedIn, removeCountFromCart); //this will remove the count of item

router.post('/remove-item-from-cart',isLoggedIn, removeProductFromCart); //this will remove the items

router.post('/checkout',isLoggedIn, checkout);

router.get('/get-orders',isLoggedIn, isAdmin, getOrders);

router.get('/update-orders',isLoggedIn, isAdmin, updateOrders);

module.exports = router;