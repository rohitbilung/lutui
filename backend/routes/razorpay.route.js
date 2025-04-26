const express = require('express');
const router = express.Router();
const { 
    createPayments,
    verifyPayments
 } = require('../controllers/razorpay.controller');
const {isLoggedIn, isAdmin} = require('../middlewares/check')

router.post('/create-payment', createPayments);

router.post('/verify-payment', verifyPayments);

module.exports = router;
