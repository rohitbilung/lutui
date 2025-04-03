const express = require('express');
const router = express.Router();
const { 
    createPayments,
    verifyPayments
 } = require('../controllers/razorpay.controller');

router.post('/create-order', createPayments);

router.post('/verify-payment', verifyPayments);

module.exports = router;
