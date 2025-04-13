const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema for color details with count only
const ColorDetailSchema = new Schema({
    color: {
        type: String,
        enum: ['black', 'white'],
        required: true
    },
    images: [{
        type: String, required: false
    }],
    count: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

// Sub-schema for size details including all colors
const SizeDetailSchema = new Schema({
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    colors: [ColorDetailSchema]
}, { _id: false });

// Main schema for clothing item
const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String, required: false
    }],
    category: {
        type: String,
        required: false,
    },
    subCategory: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    credits: {
        Concept: { type: String },
        Designer: { type: String },
    },
    regular: {
        price: {
            type: Number,
            required: true,
            min: 0
        },
        sizes: [SizeDetailSchema]
    },
    oversized: {
        price: {
            type: Number,
            required: true,
            min: 0
        },
        sizes: [SizeDetailSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true,
    }
);

// Pre-save hook to update the updatedAt field
ProductsSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;