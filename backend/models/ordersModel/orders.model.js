const mongoose = require('mongoose')
const Order = require('../ordersModel/orders.schema')
const { addCart } = require('../../services/orders.service')

module.exports = {
    getCart: async (body) => {
        try {
            let params = {
                userId: body.userId,
                "paymentStatus": body.paymentStatus
            }
            let res = await Order.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },
    
    getPopulateCart: async (body) => {
        try {
            let params = {
                userId: body.userId,
                "paymentStatus": body.paymentStatus
            }
            let res = await Order.findOne(params)
            .populate('userId')
            .populate('products.productId','name category _id')
            return res
        } catch (error) {
            return error
        }
    },

    addCart: async (body) => {
        try {
            let res = await Order.create(body)
            return res
        } catch (error) {
            return error
        }
    },

    updateCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending"
                },
                {
                    $push: {
                        "products": body.product
                    },
                    $set: {
                        "totalPrice": body.totalPrice
                    }
                },
            )
            return res
        } catch (error) {
            return error
        }
    },

    updateExistingCombinedProducts: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    "products.productId": body.productId,
                    paymentStatus: "pending"
                },
                {
                    $set: {
                        totalPrice: body.totalPrice,
                    },
                    $inc: {
                        "products.$[elem].quantity": body.quantity
                    },
                },
                {
                    arrayFilters: [
                        {
                            "elem.size": body.size,
                            "elem.type": body.type,
                            "elem.color": body.color
                        }
                    ]
                }
            );
            return res
        } catch (error) {
            return error
        }
    },

    removeAnProductCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending",
                    "products.productId": body.productId, // Ensure the product exists
                },
                {
                    $set: {
                        "products.$.quantity": body.quantity, // Update the qty for the matched product
                        totalPrice: body.totalPrice, // Update the total price
                    },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    },

    removeProductCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending"
                },
                {
                    $pull: {
                        "products": { "productId": body.productId }
                    },
                    $set: {
                        "totalPrice": body.totalPrice
                    }
                }
            )
            return res
        } catch (error) {
            return error
        }
    },

}
