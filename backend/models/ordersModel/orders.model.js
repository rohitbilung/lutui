const mongoose = require('mongoose')
const Order = require('../ordersModel/orders.schema')
const { addCart } = require('../../services/orders.service')

module.exports = {
    getCart: async (body) => {
        try {
            let params = {
                userId: body.userId,
                "status": body.status
            }
            let res = await Order.find(params)
                .populate('userId')
                .populate('products.productId','name category -_id')
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
                    status: body.status
                },
                {
                    $push: {
                        "products": body.products
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

    removeProductCart: async (body) => {
        try {
            let res = await Order.updateOne(
                { 
                    userId: body.userId,
                    status: "pending"
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
