const express = require('express');
const router = express.Router();
const { 
    createPayments,
    verifyPayments
 } = require('../controllers/razorpay.controller');
const {isLoggedIn, isAdmin} = require('../middlewares/check')
const { isVerifyAuth } = require('../middlewares/isAuthenticated')

router.post('/create-payment', createPayments);

router.post('/verify-payment',isVerifyAuth, verifyPayments);

module.exports = router;
