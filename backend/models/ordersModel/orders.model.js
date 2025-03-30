const mongoose = require('mongoose')
const Order = require('../ordersModel/orders.schema')
const { addCart } = require('../../services/orders.service')

module.exports = {
    getOrders : async (params) => {
        try {
            let res = Order.find(params)
            return res
        } catch (error) {
            return error
        }
    },

    getCart : async (params) => {
        try {
            console.log((params))
            let res = await Order.find(params)
                    .populate('userId')
                    .populate('products.productId')
            return res
        } catch (error) {
            return error
        }
    },

    addCart : async (body) => {
        try {            
            let res = await Order.create(body)
            return res
        } catch (error) {
            return error
        }
    }
}
