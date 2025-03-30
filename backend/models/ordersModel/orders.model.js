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

    getOrderByID : async (userId) => {
        try {
            let res = Order.findById(userId)
            return res
        } catch (error) {
            return error
        }
    },

    addCart : async (body) => {
        try {            
            let res = Order.create(body)
            return res
        } catch (error) {
            return error
        }
    }
}
