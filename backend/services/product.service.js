const productModel = require('../models/productModel/product.model')

module.exports = {
    t: async (email, password) => {
        try {
            let user = await userModel.getUser({ email })
            if (user && (await user.matchPassword(password))) {
                return { status:200, data: user, message: "data found" }
            } else {
                return {status:404, data: null, message: "not found" }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    createProduct: async (body) => {
        try {
            let data = await productModel.createProduct(body)
            return { status: 201, data: data, message:"Product created successful"}
        } catch (error) {
            return {
                error: error
            }
        }

    }
}