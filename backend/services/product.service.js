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
            body.productId = data._id
            for(let i=0;i<2;i++){
                body.bodyType = size[i]
                body.price = Number(body.price)+(i*100)
                let createSku = await ItemSku.createItemSku(body)
            }
            return { status: 201, data: data, message:"Product created successful"}
        } catch (error) {
            return {
                error: error
            }
        }

    }
}