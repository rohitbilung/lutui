const productModel = require('../models/productModel/product.model')
const ItemSku = require('../models/itemsku/itemskuModel')

module.exports = {
    getProductsById: async (query) => {
        try {
            let user = await productModel.getProductsById(query.productId)
            return { status:200, data: user, message: "data found" }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    createProduct: async (body) => {
        try {
            let size = ['regular','oversized']
            let data = await productModel.createProduct(body)
            return { status: 201, data: data, message:"Product created successful"}
        } catch (error) {
            return {
                error: error
            }
        }

    },

    getProducts: async (query) => {
        try {
            let data = await productModel.getProducts(query)
            return { status: 200, data: data, message:"Get all Products successful"}
        } catch (error) {
            return {
                error: error
            }
        }

    }
}