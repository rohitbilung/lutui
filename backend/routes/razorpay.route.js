const express = require('express');
const router = express.Router();
const { 
    createPayments,
    verifyPayments
 } = require('../controllers/razorpay.controller');
const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/create-payment',isLoggedIn, createPayments);

router.post('/verify-payment',isLoggedIn, verifyPayments);

module.exports = router;
