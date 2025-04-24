const express = require('express');
const router = express.Router();
const {
    addCart,
    getCart,
    removeCountFromCart,
    removeProductFromCart,
    checkout,
    getOrders,
    updateOrders,
    trackOrders,
    downloadOrders
} = require('../controllers/orders.controller');
const { auth } = require('../middlewares/auth')
const { isLoggedIn, isAdmin } = require('../middlewares/check')
const { outOfStock, checkStocks } = require('../middlewares/outOfStock')
const { isAuth } = require('../middlewares/isAuthenticated')
const { createCart } = require('../middlewares/createCart')

router.post('/add-to-cart', isLoggedIn, addCart);

router.get('/get-cart-details/:userId', isLoggedIn, getCart);

router.post('/remove-count-from-cart', isLoggedIn, removeCountFromCart); //this will remove the count of item

router.post('/remove-item-from-cart', isLoggedIn, removeProductFromCart); //this will remove the items

router.post('/checkout',isAuth, checkStocks, createCart, checkout);

router.get('/get-orders', getOrders);

router.post('/update-orders', isLoggedIn, isAdmin, updateOrders);

router.get('/track-order', trackOrders);

router.get('/download-order', downloadOrders);

module.exports = router;