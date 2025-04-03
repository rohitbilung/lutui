const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
        color:{type: String},
        size: {type: String},
        type:{type: String},
        price:{type: String},
        quantity: { type: Number },
    }],
    totalPrice: { type: Number },
    paymentStatus: { type: String, default: 'pending' },
    delhiveryStatus: { type: String, default: 'pending' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
