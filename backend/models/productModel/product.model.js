const mongoose = require('mongoose')
const Product = require('../productModel/product.schema')
const ItemSku = require("../itemsku/itemskuSchema")

module.exports = {
    getProduct : async (params) => {
        try {
            let res = Product.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },

    getProductsById : async (productId) => {
        try {
            let res = await ItemSku.find({productId:productId}).populate('productId')
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

