const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    itemQuantity: [{
        sizeType: { type: String},
        quantity: { type: Number}
    }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
