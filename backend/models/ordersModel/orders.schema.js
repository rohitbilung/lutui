const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    transactionPaymentId: { type: String },
    transactionOrderId: { type: String },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        color: { type: String },
        size: { type: String },
        type: { type: String },
        price: { type: Number },
        quantity: { type: Number },
    }],
    totalPrice: { type: Number },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refund'], default: 'pending' },
    delhiveryStatus: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
    trackingId: { type: String },
    paymentMethod: { type: String, enum: ['creditCard', 'upi', 'cod', 'razorpay'] },
    isPacked: { type: Boolean, default: false },
    shippingAddress: {
        Address1: { type: String },
        Address2: { type: String },
        district: { type: String },
        state: { type: String },
        pincode: { type: String },
        country: { type: String }
    },
    orderNotes: { type: String }
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
