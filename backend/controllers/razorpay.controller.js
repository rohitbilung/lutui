const Razorpay = require('razorpay');
const crypto = require('crypto')
const ordersModel = require('../models/ordersModel/orders.model')
require('dotenv').config();

module.exports = {
    createPayments: async (req, res) => {

        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { amount } = req.body;
        try {
            const order = await instance.orders.create({
                amount: amount * 100, // Convert to paisa
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });
            res.json({
                success: true,
                order_id: order.id,
                amount: order.amount,
                key_id: process.env.RAZORPAY_KEY_ID,
                currency: order.currency
            });
        } catch (error) {
            console.error('Order creation failed with error:', {
                message: error.message,
                code: error.code,
                status: error.status,
                description: error.description,
                field: error.field
            });
        }
    },

    verifyPayments: async (req, res) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        try {
            const generated_signature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest("hex");
            
            if (generated_signature === razorpay_signature) {
                await ordersModel.updatePaymentInfoToCart(req.user,"paid")
                res.json({ success: true, payment_id: razorpay_payment_id });
            } else {
                await ordersModel.updatePaymentInfoToCart(req.user,"failed")
                res.status(400).json({ success: false, message: "Invalid signature" });
            }
        } catch (error) {

        }
    }
}