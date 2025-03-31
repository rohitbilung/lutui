const mongoose = require('mongoose');

const itemSku = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    bodyType: { type: String },
    itemQuantity: [{
        sizeType: { type: String },
        quantity: { type: Number }
    }],
    price: {type: Number}
});

const ItemSku = mongoose.model('ItemSku', itemSku);

module.exports = ItemSku;
