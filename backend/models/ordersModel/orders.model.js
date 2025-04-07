const mongoose = require('mongoose')
const Order = require('../ordersModel/orders.schema')
const { addCart } = require('../../services/orders.service')

module.exports = {
    getCart: async (body) => {
        try {
            let params = {
                userId: body.userId,
                "paymentStatus": body.paymentStatus?body.paymentStatus:"pending"
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
                .populate('products.productId', 'name category _id')
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
                    userId: body.userId,
                    "products.productId": body.productId,
                    paymentStatus: "pending"
                },
                {
                    $set: {
                        totalPrice: body.totalPrice,
                    },
                    $inc: {
                        "products.$[elem].quantity": 1
                    },
                },
                {
                    arrayFilters: [
                        {
                            "elem.productId": body.productId,
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

    removeCountFromCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending",
                    "products.productId": body.productId, // Ensure the product exists
                },
                {
                    $set: {
                        totalPrice: body.totalPrice,
                    },
                    $inc: {
                        "products.$[elem].quantity": -1
                    },
                },
                {
                    arrayFilters: [
                        {
                            "elem.productId": body.productId,
                            "elem.size": body.size,
                            "elem.type": body.type,
                            "elem.color": body.color
                        }
                    ]
                }
            );
            await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending",
                },
                {
                    $pull: {
                        products: {
                            quantity: 0, // Remove product if quantity is zero
                        },
                    },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    },

    removeProductFromCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    'products.productId': body.productId,
                    paymentStatus: "pending"
                },
                {
                    $pull: {
                        products: {
                            productId: body.productId,
                            color: body.color,
                            size: body.size,
                            type: body.type
                        },
                    },
                    $set: {
                        "totalPrice": body.totalPrice
                    }
                }
            )
            await Order.deleteOne({
                paymentStatus: "pending",
                userId: body.userId,
                products: { $size: 0 }
              })
            return res
        } catch (error) {
            return error
        }
    },

    checkout: async (body) => {
       let res = await Order.save(body);
        return res
    }

}
