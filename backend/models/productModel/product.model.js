const mongoose = require('mongoose')
const Product = require('../productModel/product.schema')

module.exports = {
    getProduct : async (params) => {
        try {
            let res = Product.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },

    getProductByID : async (userId) => {
        try {
            let res = Product.findById(userId)
            return res
        } catch (error) {
            return error
        }
    },

    createProduct : async (body) => {
        try {
            let res = await Product.create(body)
            return res
        } catch (error) {
            return error
        }
    }
}

