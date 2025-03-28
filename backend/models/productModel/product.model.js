const mongoose = require('mongoose')
const Product = require('../productModel/product.schema')

module.exports = {
    getUser : async (params) => {
        try {
            let res = Users.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },

    getUserByID : async (userId) => {
        try {
            let res = Users.findById(userId)
            return res
        } catch (error) {
            return error
        }
    },

    createProduct : async (body) => {
        try {
            let res = Product.create(body)
            return res
        } catch (error) {
            return error
        }
    }
}

