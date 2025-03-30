const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
    }],
    totalPrice: { type: Number },
    status: { type: String, default: 'pending' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
